import { RichText } from "@wordpress/block-editor";
import { Button, Dashicon } from "@wordpress/components";
export default function SelectOptionsLayout({
	value,
	counter,
	reviewFormFields,
	setAttributes,
}) {
	const addSelectOption = (dataId) => {
		let values = { ...reviewFormFields };
		let selectVal = values[dataId].selectOptions;
		if (!values[dataId].selectOptions) {
			selectVal = [];
		}
		selectVal.push({
			option: "Option" + (counter + 1),
			value: "Value" + (counter + 1),
		});

		values[dataId].selectOptions = selectVal;

		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeSelectFieldOption = (dataId, index, changedValue) => {
		let values = { ...reviewFormFields };
		let selectVal = values[dataId].selectOptions;
		selectVal[index].option = changedValue;
		values[dataId].selectOptions = selectVal;

		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeSelectFieldOptionValue = (dataId, index, changedValue) => {
		let values = { ...reviewFormFields };
		let selectVal = values[dataId].selectOptions;
		selectVal[index].value = changedValue;
		values[dataId].selectOptions = selectVal;

		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeSelectFieldOptionDefaultCheck = (dataId, index) => {
		let values = { ...reviewFormFields };
		if (values[dataId].defaultCheck == index + 1) {
			values[dataId].defaultCheck = false;
		} else {
			values[dataId].defaultCheck = index + 1;
		}
		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const removeSelectOption = (dataId, index) => {
		let values = { ...reviewFormFields };
		let selectVal = values[dataId].selectOptions;
		selectVal.splice(index, 1);
		values[dataId].selectOptions = selectVal;

		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	return (
		<>
			<Button
				onClick={() => addSelectOption(value.id.match(/\d+/))}
				className="btn btn-secondary"
			>
				<Dashicon icon="plus-alt" /> Add Option
			</Button>
			{value.selectOptions && value.selectOptions.length > 0 && (
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
							{value.selectOptions &&
								value.selectOptions.map((optionData, index) => {
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
															onChangeSelectFieldOption(
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
															onChangeSelectFieldOptionValue(
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
																value.defaultCheck === index + 1
																	? "btn btn-success"
																	: "btn btn-outline-primary"
															}
															onClick={() => {
																onChangeSelectFieldOptionDefaultCheck(
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
																removeSelectOption(value.id.match(/\d+/), index)
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
						onClick={() => addSelectOption(value.id.match(/\d+/))}
						className="btn btn-secondary"
					>
						<Dashicon icon="plus-alt" /> Add Option
					</Button>
				</>
			)}
		</>
	);
}
