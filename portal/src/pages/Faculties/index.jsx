import React from "react";
import { Container } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
const Faculty = (props) => {
  //meta title
  document.title = "Faculty | FFU - ATMS & Faculty Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Faculties")}
            breadcrumbItem={props.t("Faculties")}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Faculty);
