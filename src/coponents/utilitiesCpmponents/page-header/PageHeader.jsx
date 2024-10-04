import "./pageHeader.scss";
 
import PropTypes from "prop-types";

const PageHeader = (props) => {
  return (
    <div className="page-header"  >
      <h2 className="page-header__title">{props.children}</h2>
    </div>
  );
};

PageHeader.propTypes = {
  children: PropTypes.node,
};

export default PageHeader;
