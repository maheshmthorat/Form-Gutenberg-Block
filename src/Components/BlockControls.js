import { AlignmentControl, BlockControls } from "@wordpress/block-editor";
import { ColorPicker, Button, Dropdown, Dashicon } from "@wordpress/components";

export default function InspectorTools({
	attributes,
	onChangeAlign,
	textColor,
	onChangeTextColor,
	backgroundColor,
	onChangeBackgroundColor,
}) {
	return (
		<>
			<BlockControls>
				<AlignmentControl value={attributes.align} onChange={onChangeAlign} />
				<Dropdown
					popoverProps={{ placement: "bottom-start" }}
					renderToggle={({ isOpen, onToggle }) => (
						<Button onClick={onToggle} aria-expanded={isOpen}>
							<Dashicon icon="editor-textcolor" />
							Text color
						</Button>
					)}
					renderContent={() => (
						<>
							<ColorPicker color={textColor} onChange={onChangeTextColor} />
						</>
					)}
				/>
				<Dropdown
					popoverProps={{ placement: "bottom-start" }}
					renderToggle={({ isOpen, onToggle }) => (
						<Button onClick={onToggle} aria-expanded={isOpen}>
							<Dashicon icon="admin-appearance" />
							Background color
						</Button>
					)}
					renderContent={() => (
						<>
							<ColorPicker
								color={backgroundColor}
								onChange={onChangeBackgroundColor}
							/>
						</>
					)}
				/>
			</BlockControls>
		</>
	);
}
