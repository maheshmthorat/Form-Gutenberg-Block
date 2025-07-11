import NameLabelPlaceholder from "./NameLabelPlaceholder.js";
import { Dashicon } from "@wordpress/components";

export default function NameOptionsLayout({
	value,
	reviewFormFields,
	setAttributes,
}) {
	return (
		<table>
			<thead>
				<tr>
					<th>Field</th>
					<th>
						<span>
							<Dashicon icon="edit" /> Label
						</span>
					</th>
					<th>
						<span>
							<Dashicon icon="editor-italic" /> Placeholder
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{value.nameOptions &&
					value.nameOptions.firstName &&
					value.nameOptions.firstName.enabled === true && (
						<NameLabelPlaceholder
							value={value}
							field={"firstName"}
							reviewFormFields={reviewFormFields}
							setAttributes={setAttributes}
						/>
					)}
				{value.nameOptions &&
					value.nameOptions.middleName &&
					value.nameOptions.middleName.enabled === true && (
						<NameLabelPlaceholder
							value={value}
							field={"middleName"}
							reviewFormFields={reviewFormFields}
							setAttributes={setAttributes}
						/>
					)}
				{value.nameOptions &&
					value.nameOptions.lastName &&
					value.nameOptions.lastName.enabled === true && (
						<NameLabelPlaceholder
							value={value}
							field={"lastName"}
							reviewFormFields={reviewFormFields}
							setAttributes={setAttributes}
						/>
					)}
			</tbody>
		</table>
	);
}
