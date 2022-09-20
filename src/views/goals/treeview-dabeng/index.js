import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CsLineIcons from "cs-line-icons/CsLineIcons";

import { InitialGoals, TreeView } from "../../../services/treeservice";
import View from "./view";

const TreeViewDabeng = () => {
  // const appRoot = DEFAULT_PATHS.APP.endsWith("/")
  //   ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
  //   : DEFAULT_PATHS.APP;

  const { currentUser } = useSelector((state) => state.auth);
  const [goals, setGoals] = useState([]);
  const [initialGoals, setInitialGoals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [nodeData, setNode] = useState(true);
  const [indData, setInd] = useState(true);
  const [styleBackround, setStyleBack] = useState(true);
  const [styleColor, setStyleCol] = useState(true);
  const [show, setShow] = useState(false);

  const compClose = () => setShow(false);
  const compShow = () => setShow(true);

  const getAllGoals = () => {
    setLoading(true);
    let result = null;
    TreeView(currentUser.token).then(function (response) {
      if (response) {
        // console.log(response);
        if (response.responseCode === 200) {
          toast.success(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
          // console.log(response.responseData);
          result = response.responseData;
          // console.log(result.type_goals);
          setGoals(result);
          setLoading(false);
        } else {
          toast.error(response.responseDesc, {
            position: "top-right",
            autoClose: 1000,
          });
          // getGoals([]);
          setLoading(false);

          // if(response.responseCode === 401) {
          //   // dispatch(setCurrentUser(''));
          //   const path = `${appRoot}/login`;
          //   history.push(path);
          // }
        }
      }
    });
  };

  const getInitialGoals = () => {
    let result = null;
    InitialGoals(currentUser.token).then(function (response) {
      if (response) {
        if (response.responseCode === 200) {
          result = response.responseData;
          setInitialGoals(result);
        }
      }
    });
  };

  useEffect(() => {
    getAllGoals();
    getInitialGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNodeClicked = (nodes) => {
    compShow();
    const ind = [];
    if (nodes !== undefined && nodes && nodes.length > 0) {
      nodes.indikator.forEach((el) => {
        ind.push(
          <Row className="g-0 py-1" key={el.key}>
            <Col xs="auto">
              <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                <div className="sh-3">
                  <CsLineIcons
                    icon="dashboard-1"
                    className="text-primary align-top"
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                <div className="d-flex flex-column">
                  <div
                    className="text-alternate mt-n1 lh-1-25"
                    style={{ fontSize: "12px" }}
                  >
                    {el.indikator}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        );
      });
    }
    // console.log(nodes.type_goals);
    let styBack = null;
    let styCol = null;
    if (
      nodeData.type_goals !== undefined &&
      nodeData.type_goals !== "" &&
      nodeData.type_goals !== null
    ) {
      styBack =
        nodes.type_goals.background !== null &&
        nodes.type_goals.background !== ""
          ? nodes.type_goals.background
          : "";
      styCol =
        nodes.type_goals.color !== null && nodes.type_goals.color !== ""
          ? nodes.type_goals.color
          : "";
    }
    setStyleBack(styBack);
    setStyleCol(styCol);
    setInd(ind);
    setNode(nodes);
  };

  const title = "Tree Views Page";
  const description = "An page for view all goals as a tree view.";
  const breadcrumbs = [{ to: "", text: "Home" }];

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <View
      title={title}
      description={description}
      show={show}
      goals={goals}
      initialGoals={initialGoals}
      indData={indData}
      nodeData={nodeData}
      breadcrumbs={breadcrumbs}
      styleBackround={styleBackround}
      styleColor={styleColor}
      onNodeClicked={handleNodeClicked}
      onCompShow={compShow}
      onCompClose={compClose}
    />
  );
};

export default TreeViewDabeng;
