import React, { useState } from "react";
import "../styles/TabbedNavigation.css";
const TabbedNavigation = (props) => {
    const tabNames = props.tabNames;

    const tabContents = props.tabContents;
    const [toggledIndex, setToggledIndex] = useState(0);
    const handleToggle = (index) => {
        setToggledIndex(toggledIndex === index ? null : index);
    };
    return (
        <React.Fragment>
            <div className="tabbed-navigation">
                <div className="tab-header">
                    {tabNames
                        ? tabNames.map((tabName, index) => {
                              return (
                                  <>
                                      <div
                                          className={`tab-item ${
                                              toggledIndex === index
                                                  ? "active"
                                                  : ""
                                          }`}
                                          data-count={index}
                                          onClick={() => {
                                              handleToggle(index);
                                          }}
                                      >
                                          <h5>{tabName}</h5>
                                      </div>
                                  </>
                              );
                          })
                        : null}
                </div>
                <div className="tab-content-wrap">
                    {tabContents
                        ? tabContents.map((tabContent, index) => {
                              return (
                                  <>
                                      <div
                                          className={`tab-content ${
                                              toggledIndex === index
                                                  ? "active"
                                                  : ""
                                          }`}
                                          data-count={index}
                                      >
                                          {tabContent}
                                      </div>
                                  </>
                              );
                          })
                        : null}
                </div>
            </div>
        </React.Fragment>
    );
};
export default TabbedNavigation;
