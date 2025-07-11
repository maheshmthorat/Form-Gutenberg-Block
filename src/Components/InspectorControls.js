import {
	AlignmentControl,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";

import {
	RangeControl,
	PanelBody,
	ToggleControl,
	Button,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";

export default function InspectorTools({
	textColor,
	backgroundColor,
	borderSetting,
	borderColor,
	borderSize,
	onChangeTextColor,
	onChangeBackgroundColor,
	onChangeBorderSetting,
	onChangeBorderColor,
	onChangeBorderSize,
	cardImageSetting,
	onChangeCardImageSetting,
	cardImageAlign,
	onChangeCardImageAlign,
	cardImage,
	onSelectImage,
	onRemoveImage,
	selectedPostId,
	featuredPost,
	handleSelectChange,
	posts,
}) {
	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__("Color settings", "ka-example-block")}
					initialOpen={false}
					colorSettings={[
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __("Text color", "ka-example-block"),
						},
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __("Background color", "ka-example-block"),
						},
					]}
				/>
				<PanelBody title="Custom Border">
					<ToggleControl
						label="Turn on/off"
						checked={borderSetting}
						onChange={onChangeBorderSetting}
					/>
					{borderSetting ? (
						<>
							<PanelColorSettings
								title={__("Border Color", "ka-example-block")}
								initialOpen={false}
								colorSettings={[
									{
										value: borderColor,
										onChange: onChangeBorderColor,
										label: __("color", "ka-example-block"),
									},
								]}
							/>
							<RangeControl
								label={__("Border Size", "ka-example-block")}
								value={borderSize}
								onChange={onChangeBorderSize}
								min={1}
								max={10} // Adjust the min and max values as needed
								step={1} // Adjust the step value as needed
							/>
						</>
					) : (
						<></>
					)}
				</PanelBody>
				<PanelBody title="Card Image">
					<ToggleControl
						label="Turn on/off"
						checked={cardImageSetting}
						onChange={onChangeCardImageSetting}
					/>
					{cardImageSetting ? (
						<MediaUploadCheck>
							<AlignmentControl
								value={cardImageAlign}
								onChange={onChangeCardImageAlign}
							/>
							{cardImage ? (
								<>
									<MediaUpload
										onSelect={onSelectImage}
										allowedTypes={["image"]}
										value={cardImage}
										render={({ open }) => (
											<Button variant={"primary"} onClick={open}>
												Replace
											</Button>
										)}
									/>
									<Button
										variant={"secondary"}
										className="is-destructive"
										onClick={onRemoveImage}
									>
										Remove
									</Button>
									{cardImage && cardImage.url && (
										<img width={50} src={cardImage.url} alt={cardImage.alt} />
									)}
								</>
							) : (
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={["image"]}
									render={({ open }) => (
										<Button variant={"secondary"} onClick={open}>
											Select Image
										</Button>
									)}
								/>
							)}
						</MediaUploadCheck>
					) : (
						<></>
					)}
				</PanelBody>
				<PanelBody tittle="Select Post">
					<h6>Select Post</h6>
					<select
						onChange={handleSelectChange}
						value={selectedPostId || featuredPost}
					>
						<option value={0}>Select a Post</option>
						{posts.map((post) => (
							<option key={post.id} value={post.id}>
								{post.title.rendered}
							</option>
						))}
					</select>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
