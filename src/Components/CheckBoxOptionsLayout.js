import { RichText } from "@wordpress/block-editor";
import { Button, Dashicon } from "@wordpress/components";
export default function CheckBoxOptionsLayout({
	value,
	counter,
	reviewFormFields,
	setAttributes,
}) {
	const addCheckboxOption = (dataId) => {
		let values = { ...reviewFormFields };
		let checkBoxVal = values[dataId].checkBoxOptions;
		if (!values[dataId].checkBoxOptions) {
			checkBoxVal = [];
		}
		checkBoxVal.push({
			option: "Option" + (counter + 1),
			value: "Value" + (counter + 1),
		});

		values[dataId].checkBoxOptions = checkBoxVal;

		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeCheckBoxFieldOption = (dataId, index, changedValue) => {
		let values = { ...reviewFormFields };
		let checkBoxVal = values[dataId].checkBoxOptions;
		checkBoxVal[index].option = changedValue;
		values[dataId].checkBoxOptions = checkBoxVal;

		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeCheckBoxFieldOptionValue = (dataId, index, changedValue) => {
		let values = { ...reviewFormFields };
		let checkBoxVal = values[dataId].checkBoxOptions;
		checkBoxVal[index].value = changedValue;
		values[dataId].checkBoxOptions = checkBoxVal;

		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeCheckBoxFieldOptionDefaultCheck = (dataId, index) => {
		let values = { ...reviewFormFields };

		if (!values[dataId].checkBoxOptions) {
			values[dataId].checkBoxOptions = [];
		}

		let checkBoxVal = values[dataId].checkBoxOptions;
		if (checkBoxVal[index].defaultCheck === true) {
			checkBoxVal[index].defaultCheck = false;
		} else {
			checkBoxVal[index].defaultCheck = true;
		}
		values[dataId].checkBoxOptions = checkBoxVal;
		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const removeCheckBoxOption = (dataId, index) => {
		let values = { ...reviewFormFields };
		let checkBoxVal = values[dataId].checkBoxOptions;
		checkBoxVal.splice(index, 1);
		values[dataId].checkBoxOptions = checkBoxVal;

		setAttributes({
			reviewFormFields: { ...values },
		});
	};
	return (
		<>
			<Button
				onClick={() => addCheckboxOption(value.id.match(/\d+/))}
				className="btn btn-secondary"
			>
				<Dashicon icon="plus-alt" /> Add Option
			</Button>
			{value.checkBoxOptions && value.checkBoxOptions.length > 0 && (
				<>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Option</th>
								<th scope="col">Value</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{value.checkBoxOptions &&
								value.checkBoxOptions.map((optionData, index) => {
									counter++;
									return (
										<React.Fragment key={index}>
											<tr>
												<th scope="row">{counter}</th>
												<td>
													<RichText
														type="text"
														placeholder="Please enter"
														className="form-control"
														onChange={(changedValue) => {
															onChangeCheckBoxFieldOption(
																value.id.match(/\d+/),
																index,
																changedValue
															);
														}}
														value={optionData.option}
													/>
												</td>
												<td>
													<RichText
														type="text"
														placeholder="Please enter"
														className="form-control"
														onChange={(changedValue) => {
															onChangeCheckBoxFieldOptionValue(
																value.id.match(/\d+/),
																index,
																changedValue
															);
														}}
														value={optionData.value}
													/>
												</td>
												<td>
													<div className="btn-group">
														<Button
															className={
																optionData.defaultCheck
																	? "btn btn-success"
																	: "btn btn-outline-primary"
															}
															onClick={() => {
																onChangeCheckBoxFieldOptionDefaultCheck(
																	value.id.match(/\d+/),
																	index
																);
															}}
														>
															<Dashicon icon="yes-alt" />
														</Button>
														<Button
															className="btn btn-outline-danger"
															onClick={() =>
																removeCheckBoxOption(
																	value.id.match(/\d+/),
																	index
																)
															}
														>
															<Dashicon icon="trash" />
														</Button>
													</div>
												</td>
											</tr>
										</React.Fragment>
									);
								})}
						</tbody>
					</table>
					<Button
						onClick={() => addCheckboxOption(value.id.match(/\d+/))}
						className="btn btn-secondary"
					>
						<Dashicon icon="plus-alt" /> Add Option
					</Button>
				</>
			)}
		</>
	);
}
