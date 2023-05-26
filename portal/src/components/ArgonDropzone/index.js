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

import { useEffect, useRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Dropzone components
import Dropzone from "dropzone";

// Dropzone styles
import "dropzone/dist/dropzone.css";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

// Custom styles for the ArgonDropzone
import ArgonDropzoneRoot from "components/ArgonDropzone/ArgonDropzoneRoot";

function ArgonDropzone({ options }) {
  const dropzoneRef = useRef();

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, { ...options });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach((dz) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <ArgonDropzoneRoot
      component="form"
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
    >
      <ArgonBox className="fallback">
        <ArgonBox component="input" name="file" type="file" multiple />
      </ArgonBox>
    </ArgonDropzoneRoot>
  );
}

// Typechecking props for the ArgonDropzone
ArgonDropzone.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ArgonDropzone;
