import InspectorTools from "./Components/InspectorControls";
import BlockTools from "./Components/BlockControls";
import FeaturedPost from "./Components/FeaturedPost";
import SortableFields from "./Components/SortableFields";
import FormFields from "./Components/FormFields";

import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

import "./editor.scss";
import { useState, useRef, useEffect } from "@wordpress/element";

import apiFetch from "@wordpress/api-fetch";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const {
		title,
		content,
		align,
		backgroundColor,
		textColor,
		borderSetting,
		borderColor,
		borderSize,
		cardImageSetting,
		cardImageAlign,
		cardImage,
		featuredPost,
		reviewFormFields,
		reviewFormLastFieldID,
		featuredPostData,
	} = attributes;

	const [posts, setPosts] = useState([]);
	const [selectedPostId, setSelectedPostId] = useState(0);

	const randID = Math.round(Math.random() * 1000000);
	const containerId = `container-${randID}`;

	async function fetchPosts() {
		try {
			const response = await apiFetch({ path: "/wp/v2/posts" });
			if (!response) {
				throw new Error(response.statusText);
			}
			const loadedPosts = await response;
			setPosts(loadedPosts);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	}

	useEffect(() => {
		fetchPosts();
		if (featuredPost) {
			setSelectedPostId(featuredPost);
		}
	}, []);

	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};

	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent });
	};
	const onChangeAlign = (newAlign) => {
		setAttributes({
			align: newAlign === undefined ? "none" : newAlign,
		});
	};

	const onChangeCardImageAlign = (newAlign) => {
		setAttributes({
			cardImageAlign: newAlign === undefined ? "none" : newAlign,
		});
	};

	const onChangeBackgroundColor = (newBackgroundColor) => {
		setAttributes({ backgroundColor: newBackgroundColor });
	};

	const onChangeTextColor = (newTextColor) => {
		setAttributes({ textColor: newTextColor });
	};

	const onChangeBorderColor = (newBorderColor) => {
		setAttributes({ borderColor: newBorderColor });
	};

	const onChangeBorderSetting = (newborderSetting) => {
		setAttributes({ borderSetting: newborderSetting });
	};

	const onChangeBorderSize = (newSize) => {
		setAttributes({ borderSize: newSize });
	};

	const onSelectImage = (newImage) => {
		setAttributes({ cardImage: newImage });
	};

	const onRemoveImage = () => {
		setAttributes({ cardImage: null });
	};

	const onChangeCardImageSetting = (newVal) => {
		setAttributes({ cardImageSetting: newVal });
	};

	const handleSelectChange = (event) => {
		const postId = parseInt(event.target.value, 10);
		setSelectedPostId(postId);
	};

	useEffect(() => {
		if (selectedPostId !== 0) {
			async function fetchSelectedPost() {
				try {
					const response = await apiFetch({
						path: `/wp/v2/posts/${selectedPostId}`,
					});
					if (!response) {
						throw new Error(response.statusText);
					}
					const postDetails = await response;
					if (featuredPost != selectedPostId) {
						setAttributes({ featuredPostData: postDetails });
					}
					setAttributes({ featuredPost: selectedPostId });
				} catch (error) {
					console.error("Error fetching selected post:", error);
				}
			}
			fetchSelectedPost();
		}
	}, [selectedPostId]);

	return (
		<>
			<InspectorTools
				textColor={textColor}
				backgroundColor={backgroundColor}
				borderSetting={borderSetting}
				borderColor={borderColor}
				borderSize={borderSize}
				cardImageAlign={cardImageAlign}
				selectedPostId={selectedPostId}
				featuredPost={featuredPost}
				cardImageSetting={cardImageSetting}
				posts={posts}
				onChangeTextColor={onChangeTextColor}
				onChangeBackgroundColor={onChangeBackgroundColor}
				onChangeBorderSetting={onChangeBorderSetting}
				onChangeBorderColor={onChangeBorderColor}
				onChangeBorderSize={onChangeBorderSize}
				onChangeCardImageSetting={onChangeCardImageSetting}
				onChangeCardImageAlign={onChangeCardImageAlign}
				cardImage={cardImage}
				onSelectImage={onSelectImage}
				onRemoveImage={onRemoveImage}
				handleSelectChange={handleSelectChange}
			/>

			<BlockTools
				attributes={attributes}
				textColor={textColor}
				backgroundColor={backgroundColor}
				onChangeAlign={onChangeAlign}
				onChangeTextColor={onChangeTextColor}
				onChangeBackgroundColor={onChangeBackgroundColor}
			/>

			<div
				className="sticky-container"
				style={{
					backgroundColor: backgroundColor,
					color: textColor,
					border: borderSetting
						? `${borderSize}px solid ${borderColor}`
						: "none",
				}}
			>
				<RichText
					className="form-control"
					tagName="h4"
					placeholder="Enter title"
					onChange={onChangeTitle}
					value={title}
					style={{
						textAlign: align,
					}}
				/>
				<hr />
				<RichText
					{...blockProps}
					className="form-control"
					tagName="p"
					onChange={onChangeContent}
					value={content}
					placeholder={__("Write your text...")}
					style={{
						textAlign: align,
					}}
				/>

				{cardImageSetting && cardImage && cardImage.url && (
					<div
						style={{
							textAlign: cardImageAlign,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<img width={100} src={cardImage.url} alt={cardImage.alt} />
						&nbsp;
						<Button
							variant={"secondary"}
							className="is-destructive"
							onClick={onRemoveImage}
						>
							Remove
						</Button>
					</div>
				)}
				<FeaturedPost featuredPostData={featuredPostData} />

				<FormFields
					randID={randID}
					containerId={containerId}
					setAttributes={setAttributes}
					reviewFormFields={reviewFormFields}
					reviewFormLastFieldID={reviewFormLastFieldID}
				/>

				{reviewFormFields &&
					typeof reviewFormFields === "object" &&
					Object.keys(reviewFormFields).length > 0 > 0 && (
						<SortableFields
							randID={randID}
							setAttributes={setAttributes}
							reviewFormFields={reviewFormFields}
						/>
					)}
			</div>
		</>
	);
}
