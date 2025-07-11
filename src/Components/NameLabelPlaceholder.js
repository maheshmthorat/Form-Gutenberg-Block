import { RichText } from "@wordpress/block-editor";
export default function NameLabelPlaceholder({
	value,
	field,
	reviewFormFields,
	setAttributes,
}) {
	const onChangeNameFieldPlaceholder = (dataId, field, changedValue) => {
		let values = { ...reviewFormFields };
		if (!values[dataId].nameOptions) {
			values[dataId].nameOptions = {};
		}
		if (!values[dataId].nameOptions[field].placeholder) {
			values[dataId].nameOptions[field].placeholder = {};
		}
		values[dataId].nameOptions[field].placeholder = changedValue;
		setAttributes({
			reviewFormFields: { ...values },
		});
	};

	const onChangeNameFieldLabel = (dataId, field, changedValue) => {
		let values = { ...reviewFormFields };
		if (!values[dataId].nameOptions) {
			values[dataId].nameOptions = {};
		}
		if (!values[dataId].nameOptions[field].label) {
			values[dataId].nameOptions[field].label = {};
		}
		values[dataId].nameOptions[field].label = changedValue;
		setAttributes({
			reviewFormFields: { ...values },
		});
	};
	return (
		<tr>
			<td>
				{field == "firstName"
					? "First Name"
					: field == "middleName"
					? "Middle Name"
					: "Last Name"}
			</td>
			<td>
				<RichText
					type="text"
					placeholder="Please enter"
					className="form-control"
					onChange={(changedValue) => {
						onChangeNameFieldLabel(value.id.match(/\d+/), field, changedValue);
					}}
					value={value.nameOptions[field].label}
				/>
			</td>
			<td>
				<RichText
					type="text"
					placeholder="Please enter"
					className="form-control"
					onChange={(changedValue) => {
						onChangeNameFieldPlaceholder(
							value.id.match(/\d+/),
							field,
							changedValue
						);
					}}
					value={value.nameOptions[field].placeholder}
				/>
			</td>
		</tr>
	);
}
