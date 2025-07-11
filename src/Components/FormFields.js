import { Button, Dashicon } from "@wordpress/components";

export default function FormFields({
	randID,
	containerId,
	setAttributes,
	reviewFormFields,
	reviewFormLastFieldID,
}) {
	const addField = function (field, containerId, fieldIcon) {
		let fieldType;
		let fieldID;
		fieldType = field;
		fieldID = reviewFormLastFieldID;

		setAttributes({
			reviewFormFields: {
				...reviewFormFields,
				[fieldID]: {
					id: "field_" + fieldID,
					type: fieldType,
					index: fieldID,
					icon: fieldIcon,
				},
			},
		});

		setAttributes({
			reviewFormID: containerId,
		});
		let fieldIDNew = parseInt(fieldID) + 1;
		setAttributes({ reviewFormLastFieldID: fieldIDNew });
		document.querySelector(".accordion-button-" + randID).click();
	};
	return (
		<div
			className="accordion accordion-flush sticky-element"
			id={"accordionFlushFormFields" + randID}
		>
			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className={"accordion-button collapsed accordion-button-" + randID}
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={"#flush-collapseOne" + randID}
						aria-expanded="false"
						aria-controls={"flush-collapseOne" + randID}
					>
						<Dashicon icon="plus-alt" /> Add Form Fields
					</button>
				</h2>
				<div
					id={"flush-collapseOne" + randID}
					className="accordion-collapse collapse"
					data-bs-parent={"#accordionFlushFormFields" + randID}
				>
					<div className="accordion-body">
						<div className="row">
							<strong>
								Standard Fields
								<hr />
							</strong>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() =>
									addField("text", containerId, "editor-textcolor")
								}
							>
								<Dashicon icon="editor-textcolor" />
								<br />
								<strong>Single Line Text</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() =>
									addField("textarea", containerId, "editor-paragraph")
								}
							>
								<Dashicon icon="editor-paragraph" />
								<br />
								<strong>Multi Line Text</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("number", containerId, "editor-ol")}
							>
								<Dashicon icon="editor-ol" />
								<br />
								<strong>Number</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("checkbox", containerId, "yes-alt")}
							>
								<Dashicon icon="yes-alt" />
								<br />
								<strong>Checkbox</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("select", containerId, "list-view")}
							>
								<Dashicon icon="list-view" />
								<br />
								<strong>Drop Down</strong>
							</Button>

							<strong>
								Advanced Fields
								<hr />
							</strong>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("name", containerId, "admin-users")}
							>
								<Dashicon icon="admin-users" />
								<br />
								<strong>Name</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("date", containerId, "calendar-alt")}
							>
								<Dashicon icon="calendar-alt" />
								<br />
								<strong>Date</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("time", containerId, "clock")}
							>
								<Dashicon icon="clock" />
								<br />
								<strong>Time</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("phone", containerId, "phone")}
							>
								<Dashicon icon="phone" />
								<br />
								<strong>Phone</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("email", containerId, "email")}
							>
								<Dashicon icon="email" />
								<br />
								<strong>Email</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("file", containerId, "cloud-upload")}
							>
								<Dashicon icon="cloud-upload" />
								<br />
								<strong>File</strong>
							</Button>
							<Button
								className="btn btn-default col-3 customImageButton"
								onClick={() => addField("url", containerId, "admin-links")}
							>
								<Dashicon icon="admin-links" />
								<br />
								<strong>Website</strong>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
