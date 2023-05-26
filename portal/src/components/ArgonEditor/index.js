/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// react-quill components
import ReactQuill from "react-quill";

// react-quill styles
import "react-quill/dist/quill.snow.css";

// Custom styles for the ArgonEditor
import ArgonEditorRoot from "components/ArgonEditor/ArgonEditorRoot";

function ArgonEditor(props) {
  return (
    <ArgonEditorRoot>
      <ReactQuill theme="snow" {...props} />
    </ArgonEditorRoot>
  );
}

export default ArgonEditor;
