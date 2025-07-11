import FeaturedPost from "./Components/FeaturedPost";

import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
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
		featuredPostData,
		reviewFormFields,
		reviewFormID,
	} = attributes;

	let sortedReviewFormFields;
	if (reviewFormFields && reviewFormFields !== null) {
		sortedReviewFormFields = Object.entries(reviewFormFields)
			.sort((a, b) => a[1].index - b[1].index)
			.map(([field, value]) => value);
	}

	return (
		<div
			style={{
				backgroundColor: backgroundColor,
				color: textColor,
				border: borderSetting ? `${borderSize}px solid ${borderColor}` : "none",
			}}
		>
			<RichText.Content
				{...blockProps}
				tagName="h2"
				value={title}
				style={{
					textAlign: align,
				}}
			/>
			<RichText.Content
				{...blockProps}
				tagName="p"
				value={content}
				style={{
					textAlign: align,
				}}
			/>
			{cardImageSetting && cardImage && cardImage.url && (
				<div style={{ textAlign: cardImageAlign }}>
					<img width={50} src={cardImage.url} alt={cardImage.alt} />
				</div>
			)}
			{sortedReviewFormFields &&
				typeof sortedReviewFormFields === "object" &&
				Object.keys(sortedReviewFormFields).length > 0 > 0 && (
					<form className="reviewForm" id={reviewFormID} method="POST">
						{Object.entries(sortedReviewFormFields).map(([field, value]) => (
							<div key={value.id}>
								<label>{value.label}</label>
								{value.type == "textarea" ? (
									<textarea
										id={value.id}
										placeholder={value.placeholder}
										required={value.required ? "required" : false}
										name={value.id}
									></textarea>
								) : value.type === "checkbox" ? (
									value.checkBoxOptions &&
									value.checkBoxOptions.map((optionData, index) => {
										return (
											<div key={index}>
												<label for={value.id + "-" + index}>
													{optionData.option}
													<input
														name={value.id}
														id={value.id + "-" + index}
														type="checkbox"
														value={optionData.value}
														required={value.required ? "required" : false}
														checked={
															optionData.defaultCheck ? "checked" : false
														}
													/>
												</label>
											</div>
										);
									})
								) : (
									<input
										type={value.type}
										id={value.id}
										placeholder={value.placeholder}
										required={value.required ? "required" : false}
										name={value.id}
									/>
								)}
							</div>
						))}
						<input type="submit" value="Save" />
					</form>
				)}
			<FeaturedPost featuredPostData={featuredPostData} />
		</div>
	);
}
