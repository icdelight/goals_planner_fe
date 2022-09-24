import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Row, Col, Card, Button, Tab, Nav, Form, InputGroup } from "react-bootstrap";
import HtmlHead from "components/html-head/HtmlHead";
import BreadcrumbList from "components/breadcrumb-list/BreadcrumbList";
import Offcanvas from "react-bootstrap/Offcanvas";
import CsLineIcons from "cs-line-icons/CsLineIcons";
import OrganizationChart from "../../../components/org-chart/ChartContainer";
import MyNode from "../../../components/node/mynode";
import SelectMultiple from "components/select/SelectMultiple";
import SelectServerSide from "components/select/SelectServerSide";
import SelectSearchCluster from "components/select/SelectSearchCluster";
import {
  SearchGoals,TreeViewCluster,
} from "../../../services/treeservice";
import {
  FindCluster
} from "../../../services/clusterservice"
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { el } from "date-fns/locale";

const View = ({
  title,
  description,
  breadcrumbs = [],
  trees = null,
  selectedParents = [],
  initialGoals = [],
  onNodeClicked,
  show,
  nodeData,
  indData,
  styleBackround,
  styleColor,
  onCompClose,
  onSelectedParents,
  onTreeLoaded,
  onClickCluster,
  onClickClearCluster,
}) => {
  const orgchart = useRef([]);
  const [isLoading, setLoading] = useState(true);
  const [navActiveKey, setNavActiveKey] = useState("");
  const [selectedSearch, setSelectedSearch] = useState(null);
  const [selectedTree, setSelectedTree] = useState(trees);
  const { currentUser, isLogin } = useSelector((state) => state.auth);

  const exportTo = (index) => {
    orgchart.current[index].exportTo("organization_chart", "pdf");
  };
  const searchGoals = (inputValue, callback) => {
    FindCluster(currentUser.token,1, inputValue)
      .then((response) => {
        if (response) {
          // console.log(response);
          if (response.responseCode === 200) {
            callback(response.responseData);
            return;
          }
        }
        callback([]);
      })
      .catch(() => {
        callback([]);
      });
  };

  const fetchTree = (id_goals) => {
    setLoading(true);
    console.log('search',selectedSearch);
    if(selectedSearch == null) {
      setSelectedTree(trees);
      setLoading(false);
      // console.log('tree',selectedTree);
      // console.log('trees',trees);
    }else{
      const trees_ = selectedTree;
      // console.log(selectedTree);
      TreeViewCluster(currentUser.token,id_goals,selectedSearch.id_cluster)
      .then((response) => {
        if (response) {
          console.log(response);
          // if (response.responseCode === 200) {
          //   callback(response.responseData);
          //   return;
          // }
          trees_[id_goals] = response.responseData;
          setSelectedTree(trees_);
          setLoading(false);
          console.log('trees',trees_);
        }
        // callback([]);
      })
      .catch(() => {
        // callback([]);
      });
    }
  };
  
  const ImplementCluster = (id_goals) => {
    // console.log(id_goals,selectedSearch);
    fetchTree(id_goals);
  };

  useEffect(() => {
    if (selectedParents.length === 1) {
      setNavActiveKey(`tab-${selectedParents?.[0]?.value?.id_goals}`);
    }
  }, [selectedParents]);

  // if (isLoading) {
  //   return <div className="App">Loading...</div>;
  // }
  return (
    <div className="App2">
      {/* {setLoading(true)} */}
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          {/* Title Start */}
          <section className="scroll-section" id="title">
            <div className="page-title-container">
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </div>

            <Row className="align-items-end justify-content-center">
              <Col lg="4">
                <Form.Label className="d-block">Select Parent</Form.Label>
                <SelectMultiple
                  placeholder="Please Select the Parent First"
                  options={initialGoals.map((item) => ({
                    label: item.title_goals,
                    value: item,
                  }))}
                  onChange={(val) => {
                    const current = selectedParents;
                    const diff = _.difference(current, val);
                    const isAdded = diff.length === 0;
                    onSelectedParents(val);
                    if (isAdded) {
                      const lastItem = val?.[val.length - 1];
                      onTreeLoaded(
                        lastItem?.value?.parent_family,
                        lastItem?.value?.id_goals
                      );
                    }
                  }}
                  value={selectedParents}
                />
              </Col>
              <Col></Col>
            </Row>
            <Tab.Container activeKey={navActiveKey}>
              <Nav
                activeKey={navActiveKey}
                variant="tabs"
                className="nav-tabs-title nav-tabs-line-title my-4 mx-1"
                onSelect={setNavActiveKey}
              >
                {selectedParents.map((item, index) => (
                  <Nav.Item key={`tab-${index}`}>
                    <Nav.Link eventKey={`tab-${item.value.id_goals}`}>
                      {item.value.title_goals}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Tab.Content>
                {trees &&
                  selectedParents.map((item, index) => (
                    <Tab.Pane
                      key={`content-${index}`}
                      eventKey={`tab-${item.value.id_goals}`}
                    >
                      <div className="scroll-section EmptyDiv os-host os-host-foreign os-host-resize-disabled os-host-scrollbar-vertical-hidden os-host-transition">
                        <Row>
                          <Col lg="8" md="8" sm="8">
                            <SelectSearchCluster
                              value={selectedSearch}
                              placeholder="Search cluster here..."
                              loadOptions={debounce(searchGoals, 500)}
                              onChange={setSelectedSearch}
                              getOptionLabel={(e) => e.title_goals}
                              getOptionValue={(e) => e.id_goals}
                            />
                          </Col>
                          <Col  lg="4" md="4" sm="4">
                            <div className="btn-group">
                              <Button
                                onClick={() => onClickCluster(item.value.id_goals,selectedSearch)}
                                variant="gradient-primary"
                                className="btn-icon btn-icon-end"
                              >
                                <span>Set Cluster</span>{" "}
                                <CsLineIcons icon="bookmark" />
                              </Button>
                              <Button
                                onClick={() => onClickClearCluster(item?.value?.parent_family,item.value.id_goals)}
                                variant="gradient-primary"
                                className="btn-icon btn-icon-end"
                              >
                                <span>Clear Cluster</span>{" "}
                                <CsLineIcons icon="bookmark" />
                              </Button>

                            </div>
                          </Col>
                        </Row>
                        {trees?.[item?.value?.id_goals] && (
                          <OrganizationChart
                            ref={(el) => (orgchart.current[index] = el)}
                            key={`react-org-${item?.value?.id_goals}`}
                            id="chartTree"
                            datasource={trees?.[item?.value?.id_goals]}
                            chartClass="myChart"
                            NodeTemplate={MyNode}
                            pan
                            zoom
                            onClickNode={(clickedNode) =>
                              onNodeClicked(clickedNode)
                            }
                          />
                        )}
                          <Button
                            onClick={() => exportTo(index)}
                            variant="gradient-primary"
                            className="btn-icon btn-icon-end"
                            style={{ position: "absolute", right: 20, top: 55 }}
                          >
                            <span>Export To PDF</span>{" "}
                            <CsLineIcons icon="download" />
                          </Button>
                      </div>
                    </Tab.Pane>
                  ))}
              </Tab.Content>
            </Tab.Container>

            {/* </Card> */}
          </section>
          {/* Title End */}
          {/* <button
            type="button"
            className="btn-icon btn-icon-start ms-1 btn btn-outline-primary"
          >
            Click Me
          </button> */}
        </Col>
      </Row>

      <Offcanvas show={show} onHide={onCompClose} placement="end" name="end">
        <Offcanvas.Header
          closeButton
          className="row"
          style={{ backgroundColor: styleBackround, color: styleColor }}
        >
          <small id="passwordHelpBlock" className="form-text text-muted sm-12">
            Title
          </small>
          <Offcanvas.Title className="sm-12">
            {nodeData.title_goals}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{ background: "var(--background-navcolor-dark)" }}
        >
          <Card
            className="mb-3"
            body
            style={{ background: "rgba(255,255,255,.05) !important" }}
          >
            <Card.Header className="pt-0 pb-1">
              <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                <small
                  id="passwordHelpBlock"
                  className="form-text text-muted sm-12"
                >
                  PIC
                </small>
                <span className="col-md col-6 sm-6">{nodeData.pic_goals}</span>
                <span className="col-md col-6 sm-6"> </span>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="row mt-0 mb-0">
                <small
                  id="passwordHelpBlock"
                  className="form-text text-muted sm-12"
                >
                  Description
                </small>
                <span className="sm-12">
                  <Card.Text>{nodeData.desc_goals}</Card.Text>
                </span>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row mt-0 mb-0">
                <small
                  id="passwordHelpBlock"
                  className="form-text text-muted sm-12"
                >
                  Progress
                </small>
                <span className="sm-12">
                  <Card.Text>{nodeData.progress}</Card.Text>
                </span>
              </div>
            </Card.Body>
            <Card.Footer className="pt-0 pb-1">
              <div className="row mt-0 mb-0">
                <small
                  id="passwordHelpBlock"
                  className="form-text text-muted sm-12 col-md col-6"
                >
                  Start Date
                </small>
                <span className="col-md col-6 sm-12">
                  <Card.Text>{nodeData.start_date}</Card.Text>
                </span>
              </div>
              <div className="row mt-0 mb-0">
                <small
                  id="passwordHelpBlock"
                  className="form-text text-muted sm-12 col-md col-6"
                >
                  End Date
                </small>
                <span className="col-md col-6 sm-12">
                  <Card.Text>{nodeData.due_date}</Card.Text>
                </span>
              </div>
            </Card.Footer>
          </Card>
          <Card
            className="mb-3"
            body
            style={{ background: "rgba(255,255,255,.05) !important" }}
          >
            <Card.Header className="pt-0 pb-1">
              <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                <small
                  id="passwordHelpBlock"
                  className="form-text text-muted sm-12"
                >
                  Indikator :{" "}
                </small>
              </div>
            </Card.Header>
            <Card.Body className="mb-n2 py-1">{indData}</Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default View;