# 🧩 Form Gutenberg Block – Custom Form Builder for WordPress

**Form-Gutenberg-Block** is a custom Gutenberg block for building forms directly in the WordPress editor — similar to Gravity Forms or WPForms — but lighter and developer-friendly.

This plugin allows you to **add custom forms** via the block editor, and display them on the frontend. (Submissions are not saved yet — in development!)

---

## 📸 What It Does

* 🔧 Add form fields via Gutenberg (text, email, textarea, etc.)
* 🧱 Drag-and-drop editing inside the WordPress editor
* 🌐 Forms automatically render on the frontend
* ✉️ Includes input validation (basic)
* 🧪 Submission handling coming soon (in development)

---

## ⚙️ Installation

### Method 1: Manual (Development)

1. Clone or download this repo into `/wp-content/plugins/Form-Gutenberg-Block`
2. Run the build process:

```bash
npm install
npm run build
```

3. Activate the plugin in your WordPress admin panel

---

## 🛠 Block Features

* ✅ Text Input
* ✅ Email Input
* ✅ Textarea
* 🚧 (Checkbox, Select, Radio – coming soon)
* ✅ Basic label + placeholder editing
* ✅ Block-level attributes for each field
* 🖼 Live preview inside Gutenberg

---

## 📦 File Structure

```
form-gutenberg-block/
├── build/
├── src/
│   ├── block/
│   │   ├── edit.js
│   │   ├── save.js
│   │   ├── index.js
│   │   └── style.scss
├── form-gutenberg-block.php
├── package.json
└── README.md
```

---

## 🚀 In Progress

* 💾 Save form submissions (to DB / via AJAX)
* 📨 Send emails on submission
* ⚙️ Settings panel per block/form
* 🧩 Block variations (Multi-step, Contact, Survey)
* 🔌 REST API integration for headless use

---

## 💡 Usage

1. Go to **Posts** or **Pages** → Add New
2. Click the ➕ block inserter → Search for **“Form Block”**
3. Drag fields into your form
4. Update field labels, placeholders, and types
5. Publish the page — your form will render on the frontend

---

## 📝 Example Form Output

```html
<form class="custom-form">
  <label for="name">Name</label>
  <input type="text" name="name" placeholder="Enter your name" />

  <label for="email">Email</label>
  <input type="email" name="email" placeholder="Enter your email" />

  <label for="message">Message</label>
  <textarea name="message" placeholder="Type your message"></textarea>

  <button type="submit">Send</button>
</form>
```

---

## 🧠 Developer Notes

* Built using **@wordpress/scripts**
* Uses `registerBlockType` and `InnerBlocks` for flexible form layouts
* Frontend uses `save.js` to output form HTML
* Submissions currently handled via default `<form>` behavior (JS/AJAX to be added)

---

## 🧪 Demo or Playground

You can test the form creation in any Gutenberg-supported post/page editor.
Live frontend rendering will work right away.

**🛑 Note:** Form **submissions are not saved yet.** That’s part of the next release.

---

## 🤝 Contribution

Open to PRs for:

* Input validation
* AJAX handling
* Submission storage
* Field types (date, checkbox, etc.)

---

## 📄 License

MIT or GPLv2 (Choose depending on your plugin license)
