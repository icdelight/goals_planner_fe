import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Row, Col, Card, Button, Tab, Nav, Form } from "react-bootstrap";
import HtmlHead from "components/html-head/HtmlHead";
import BreadcrumbList from "components/breadcrumb-list/BreadcrumbList";
import Offcanvas from "react-bootstrap/Offcanvas";
import CsLineIcons from "cs-line-icons/CsLineIcons";
import OrganizationChart from "../../../components/org-chart/ChartContainer";
import MyNode from "../../../components/node/mynode";
import SelectMultiple from "components/select/SelectMultiple";
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
}) => {
  const orgchart = useRef([]);
  const [navActiveKey, setNavActiveKey] = useState("");

  const exportTo = (index) => {
    orgchart.current[index].exportTo("organization_chart", "pdf");
  };

  useEffect(() => {
    if (selectedParents.length === 1) {
      setNavActiveKey(`tab-${selectedParents?.[0]?.value?.id_goals}`);
    }
  }, [selectedParents]);

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
                        {trees?.[item?.value?.id_goals] && (
                          <OrganizationChart
                            ref={(el) => (orgchart.current[index] = el)}
                            key={`react-org-${item?.value?.id_goals}`}
                            id="chartTree"
                            datasource={trees?.[item?.value?.id_goals]}
                            chartClass="myChart"
                            NodeTemplate={MyNode}
                            pan
                            // zoom
                            onClickNode={(clickedNode) =>
                              onNodeClicked(clickedNode)
                            }
                          />
                        )}
                        <Button
                          onClick={() => exportTo(index)}
                          variant="gradient-primary"
                          className="btn-icon btn-icon-end"
                          style={{ position: "absolute", right: 16, top: 8 }}
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