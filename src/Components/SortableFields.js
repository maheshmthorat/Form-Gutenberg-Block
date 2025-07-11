import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Dashicon } from "@wordpress/components";
import { RichText } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import CheckBoxOptionsLayout from "./CheckBoxOptionsLayout.js";
import SelectOptionsLayout from "./SelectOptionsLayout.js";
import NameOptionsLayout from "./NameOptionsLayout.js";

export default function SortableFields({
	randID,
	setAttributes,
	reviewFormFields,
}) {
	const [isRemoveField, setIsRemoveField] = useState(false);

	const removeField = (dataId) => {
		setIsRemoveField(dataId);
	};

	const handleConfirm = () => {
		let values = { ...reviewFormFields };
		delete values[isRemoveField];
		setAttributes({
			reviewFormFields: { ...values },
		});
		setIsRemoveField(false);
	};

	const requiredField = (dataId, event) => {
		let values = { ...reviewFormFields };
		values[dataId].required = event.target.checked ? 1 : 0;
		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeFieldLabel = (dataId, changedValue) => {
		let values = { ...reviewFormFields };
		values[dataId].label = changedValue;
		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeFieldPlaceholder = (dataId, changedValue) => {
		let values = { ...reviewFormFields };
		values[dataId].placeholder = changedValue;
		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onSetNameOptionEnable = (dataId, field) => {
		let values = { ...reviewFormFields };
		if (!values[dataId].nameOptions) {
			values[dataId].nameOptions = {};
		}
		if (!values[dataId].nameOptions[field]) {
			values[dataId].nameOptions[field] = { enabled: false };
			values[dataId].nameOptions[field].enabled = true;
		} else {
			if (values[dataId].nameOptions[field].enabled === true) {
				values[dataId].nameOptions[field].enabled = false;
			} else {
				values[dataId].nameOptions[field].enabled = true;
			}
		}
		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onDragEnd = (result) => {
		if (!result.destination) return; // Dropped outside the list
		const fieldID = result.draggableId.match(/\d+/); // Get the ID of the field being dragged

		let values = { ...reviewFormFields };

		let oldIndex = values[fieldID].index;
		let newIndex = result.destination.index;

		values[fieldID].index = newIndex;

		Object.entries(reviewFormFields).map(([field, value]) => {
			if (value.id != result.draggableId) {
				let curElm = value.id.match(/\d+/);
				let calCulatedVal = values[curElm].index;
				if (
					oldIndex <= values[curElm].index &&
					newIndex >= values[curElm].index
				) {
					calCulatedVal = values[curElm].index - 1;
				}
				if (
					newIndex <= values[curElm].index &&
					oldIndex >= values[curElm].index
				) {
					calCulatedVal = values[curElm].index + 1;
				}
				values[curElm].index = calCulatedVal;
			}
		});

		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	let sortedReviewFormFields;
	if (reviewFormFields && reviewFormFields !== null) {
		sortedReviewFormFields = Object.entries(reviewFormFields)
			.sort((a, b) => a[1].index - b[1].index)
			.map(([field, value]) => value);
	}

	return (
		<div>
			{isRemoveField && (
				<>
					<div className="alertOverlay"></div>
					<div className="alert alert-light floatingAlert" role="alert">
						<h3>Are you sure Delete this Field?</h3>
						<br />
						<br />
						<div className="btn-group bottomSpace" role="group">
							<Button className="btn btn-danger" onClick={handleConfirm}>
								Remove
							</Button>
							<Button
								className="btn btn-dark"
								onClick={() => setIsRemoveField(false)}
							>
								Cancel
							</Button>
						</div>
					</div>
				</>
			)}

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="list">
					{(provided) => (
						<ul
							ref={provided.innerRef}
							style={{
								listStyleType: "none",
								padding: 0,
								margin: 0,
								overflow: "visible",
								background: "#f6f6f6",
							}}
						>
							{Object.entries(sortedReviewFormFields).map(([field, value]) => {
								let counter = 0;
								return (
									<Draggable
										key={value.id}
										draggableId={value.id}
										index={value.index}
									>
										{(provided) => (
											<li ref={provided.innerRef} {...provided.draggableProps}>
												<div
													className="row"
													style={{
														background: "#f6f6f6",
														margin: "10px 0",
														paddingTop: "10px",
														border: "solid 1px",
													}}
													key={value.id}
												>
													<div className="col-sm-12">
														<div className="row">
															<div className="col-12 col-sm-12">
																<div className="btn-group">
																	<button
																		className="btn btn-default btn-sm"
																		disabled
																	>
																		<b style={{ textTransform: "uppercase" }}>
																			<Dashicon icon={value.icon} />{" "}
																			{value.type}
																		</b>
																	</button>
																	<button
																		className="btn btn-dark btn-sm"
																		disabled
																	>
																		ID:{" "}
																		<b style={{ textTransform: "uppercase" }}>
																			{value.id.match(/\d+/)}
																		</b>
																	</button>
																</div>
																<div
																	className="btn btn-secondary moveButton"
																	{...provided.dragHandleProps}
																	style={{
																		float: "right",
																		marginBottom: "10px",
																	}}
																>
																	<Dashicon icon="move" /> Move
																</div>
																<div className="input-group mb-3">
																	<div className="fieldPreview">
																		<small>Preview</small>
																		<hr />
																		<b>
																			{!value.label ? "Untitled" : value.label}{" "}
																			{value.required ? (
																				<span style={{ color: "red" }}>
																					(required)
																				</span>
																			) : (
																				""
																			)}
																		</b>
																		{value.type === "textarea" ? (
																			<textarea
																				className="form-control"
																				id={value.id}
																				placeholder={value.placeholder}
																			></textarea>
																		) : value.type === "checkbox" ? (
																			<>
																				<div
																					className="col-12 col-sm-12 "
																					style={{ padding: "10px 0" }}
																				>
																					{value.checkBoxOptions &&
																						value.checkBoxOptions.map(
																							(optionData, index) => {
																								return (
																									<label
																										key={index}
																										className="btn btn-default"
																									>
																										<input
																											type="checkbox"
																											checked={
																												optionData.defaultCheck
																													? true
																													: false
																											}
																										/>{" "}
																										{optionData.value}
																									</label>
																								);
																							}
																						)}
																				</div>
																			</>
																		) : value.type === "select" ? (
																			<>
																				<div className="col-12 col-sm-12" />
																				<select
																					className="form-select"
																					value={
																						(value.selectOptions &&
																							value.selectOptions[
																								value.defaultCheck - 1
																							]?.value) ||
																						""
																					}
																					onChange={() => {}}
																				>
																					{value.selectOptions &&
																						value.selectOptions.map(
																							(optionData, index) => {
																								return (
																									<option
																										key={index}
																										value={optionData.value}
																									>
																										{optionData.option}
																									</option>
																								);
																							}
																						)}
																				</select>
																			</>
																		) : value.type === "name" ? (
																			<>
																				<div
																					className="col-12 col-sm-12"
																					style={{ padding: "10px 0" }}
																				>
																					<div className="row">
																						{value.nameOptions &&
																							value.nameOptions.firstName &&
																							value.nameOptions.firstName
																								.enabled === true && (
																								<div className="col-md-4">
																									<label>
																										<b>
																											{
																												value.nameOptions
																													.firstName.label
																											}
																										</b>
																										<input
																											type="text"
																											placeholder={
																												value.nameOptions
																													.firstName.placeholder
																											}
																										/>
																									</label>
																								</div>
																							)}
																						{value.nameOptions &&
																							value.nameOptions.middleName &&
																							value.nameOptions.middleName
																								.enabled === true && (
																								<div className="col-md-4">
																									<label>
																										<b>
																											{
																												value.nameOptions
																													.middleName.label
																											}
																										</b>
																										<input
																											type="text"
																											placeholder={
																												value.nameOptions
																													.middleName
																													.placeholder
																											}
																										/>
																									</label>
																								</div>
																							)}
																						{value.nameOptions &&
																							value.nameOptions.lastName &&
																							value.nameOptions.lastName
																								.enabled === true && (
																								<div className="col-md-4">
																									<label>
																										<b>
																											{
																												value.nameOptions
																													.lastName.label
																											}
																										</b>
																										<input
																											type="text"
																											placeholder={
																												value.nameOptions
																													.lastName.placeholder
																											}
																										/>
																									</label>
																								</div>
																							)}
																					</div>
																				</div>
																			</>
																		) : (
																			<input
																				type={value.type}
																				className="form-control"
																				id={value.id}
																				placeholder={value.placeholder}
																			/>
																		)}
																	</div>

																	{value.type === "name" && (
																		<>
																			<strong>Fields</strong>
																			<div className="col-md-12" />
																			<Button
																				className={
																					value.nameOptions &&
																					value.nameOptions.firstName &&
																					value.nameOptions.firstName
																						.enabled === true
																						? "btn col-md-4 btn-outline-success"
																						: "btn col-md-4 btn-outline-secondary"
																				}
																				onClick={() => {
																					onSetNameOptionEnable(
																						value.id.match(/\d+/),
																						"firstName"
																					);
																				}}
																			>
																				<Dashicon icon="yes-alt" /> First Name
																			</Button>
																			<Button
																				className={
																					value.nameOptions &&
																					value.nameOptions.middleName &&
																					value.nameOptions.middleName
																						.enabled === true
																						? "btn col-md-4 btn-outline-success"
																						: "btn col-md-4 btn-outline-secondary"
																				}
																				onClick={() => {
																					onSetNameOptionEnable(
																						value.id.match(/\d+/),
																						"middleName"
																					);
																				}}
																			>
																				<Dashicon icon="yes-alt" /> Middle Name
																			</Button>
																			<Button
																				className={
																					value.nameOptions &&
																					value.nameOptions.lastName &&
																					value.nameOptions.lastName.enabled ===
																						true
																						? "btn col-md-4 btn-outline-success"
																						: "btn col-md-4 btn-outline-secondary"
																				}
																				onClick={() => {
																					onSetNameOptionEnable(
																						value.id.match(/\d+/),
																						"lastName"
																					);
																				}}
																			>
																				<Dashicon icon="yes-alt" /> Last Name
																			</Button>
																		</>
																	)}
																</div>
															</div>

															<div className="col-12 col-sm-12">
																<div
																	className="accordion accordion-flush"
																	id={"accordionFlush" + randID + value.id}
																>
																	<div className="accordion-item">
																		<h2 className="accordion-header">
																			<button
																				className="accordion-button collapsed"
																				type="button"
																				data-bs-toggle="collapse"
																				data-bs-target={
																					"#flush-collapseOne" +
																					randID +
																					value.id
																				}
																				aria-expanded="false"
																				aria-controls={
																					"flush-collapseOne" +
																					randID +
																					value.id
																				}
																			>
																				<Dashicon icon="admin-settings" />
																				{"  "}
																				Settings
																			</button>
																		</h2>
																		<div
																			id={
																				"flush-collapseOne" + randID + value.id
																			}
																			className="accordion-collapse collapse"
																			data-bs-parent={
																				"#accordionFlush" + randID + value.id
																			}
																		>
																			<div className="accordion-body">
																				<div className="row">
																					<div className="col-12 col-sm-12">
																						<div
																							className="btn-group bottomSpace"
																							role="group"
																						>
																							<label className="btn btn-outline-primary components-button">
																								<input
																									type="checkbox"
																									checked={
																										value.required ? 1 : 0
																									}
																									onChange={(event) =>
																										requiredField(
																											value.id.match(/\d+/),
																											event
																										)
																									}
																								/>
																								Required
																							</label>
																							<Button
																								className="btn btn-outline-danger"
																								onClick={() =>
																									removeField(
																										value.id.match(/\d+/)
																									)
																								}
																							>
																								Remove
																							</Button>
																						</div>
																					</div>
																					<div className="input-group bottomSpace mb-12 ">
																						<div className="input-group-prepend">
																							<span className="input-group-text">
																								<Dashicon icon="edit" /> Field
																								Label
																							</span>
																						</div>
																						<RichText
																							type="text"
																							placeholder="Please enter"
																							className="form-control"
																							onChange={(changedValue) => {
																								onChangeFieldLabel(
																									value.id.match(/\d+/),
																									changedValue
																								);
																							}}
																							value={
																								!value.label
																									? "Untitled"
																									: value.label
																							}
																						/>
																					</div>
																					{value.type === "checkbox" ? (
																						<CheckBoxOptionsLayout
																							value={value}
																							counter={counter}
																							reviewFormFields={
																								reviewFormFields
																							}
																							setAttributes={setAttributes}
																						/>
																					) : value.type === "select" ? (
																						<SelectOptionsLayout
																							value={value}
																							counter={counter}
																							reviewFormFields={
																								reviewFormFields
																							}
																							setAttributes={setAttributes}
																						/>
																					) : value.type === "name" ? (
																						<NameOptionsLayout
																							value={value}
																							reviewFormFields={
																								reviewFormFields
																							}
																							setAttributes={setAttributes}
																						/>
																					) : value.type === "date" ||
																					  value.type === "time" ||
																					  value.type === "file" ? (
																						<></>
																					) : (
																						<div className="input-group bottomSpace mb-12">
																							<div className="input-group-prepend">
																								<span className="input-group-text">
																									<Dashicon icon="editor-italic" />{" "}
																									Placeholder
																								</span>
																							</div>
																							<RichText
																								type="text"
																								placeholder="Please enter"
																								className="form-control"
																								onChange={(changedValue) => {
																									onChangeFieldPlaceholder(
																										value.id.match(/\d+/),
																										changedValue
																									);
																								}}
																								value={value.placeholder}
																							/>
																						</div>
																					)}
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<br />
													</div>
												</div>
											</li>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder} {/* This is the placeholder */}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			<button className="btn btn-primary disabled">Submit</button>
		</div>
	);
}
