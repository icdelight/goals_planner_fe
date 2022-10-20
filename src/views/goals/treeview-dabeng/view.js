import React, { useEffect, useRef, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import _ from "lodash";
import {
  Row,
  Col,
  Card,
  Button,
  Tab,
  Nav,
  Form,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import HtmlHead from "components/html-head/HtmlHead";
import BreadcrumbList from "components/breadcrumb-list/BreadcrumbList";
import Offcanvas from "react-bootstrap/Offcanvas";
import CsLineIcons from "cs-line-icons/CsLineIcons";
import OrganizationChart from "../../../components/org-chart/ChartContainer";
import MyNode from "../../../components/node/mynode";
import SelectMultiple from "components/select/SelectMultiple";
import SelectSearchCluster from "components/select/SelectSearchCluster";
import {
  TreeExcelDownload,
  TreeCsvDownload,
  TreeViewCluster,
} from "../../../services/treeservice";
import { FindCluster } from "../../../services/clusterservice";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import useCustomLayout from 'hooks/useCustomLayout';
import { DEFAULT_PATHS } from "../../../config";
import { MENU_PLACEMENT, LAYOUT, MENU_BEHAVIOUR } from 'constants.js';
import jsPDF from "jspdf";

const BtnGroupEdit = function (propss) {
  const { role, onclick} = propss;
  if(role !== 'viewer') {
    return (
      <div className="btn-group" >
        <button
          type="button"
          onClick={onclick}
          className="btn-icon btn-icon-start ms-1 btn btn-outline-warning"
        >
          Edit
        </button>
      </div>
    );
  }else{
    return ('');
  }
}

const View = ({
  title,
  description,
  breadcrumbs = [],
  trees = null,
  selectedSearch,
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
  onSelectedSearch,
}) => {
  useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Boxed, behaviour: MENU_BEHAVIOUR.Unpinned });
  const orgchart = useRef([]);
  const [isLoading, setLoading] = useState(true);
  const [isShowInd, setShowInd] = useState(false);
  const [isChartClass, setChartClass] = useState("");
  const [navActiveKey, setNavActiveKey] = useState("");
  const [selectedTree, setSelectedTree] = useState(trees);
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const [cardLoading, setCardLoading] = useState(false);
  const appRoot = DEFAULT_PATHS.APP.endsWith("/")
    ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
    : DEFAULT_PATHS.APP;
  const history = useHistory();
  const exportAllToPDF = async () => {
    setCardLoading(true);
    let buff = null;
    let doc = null;
    doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });
    let i = 0;
    const loop = new Promise((resolve,reject) => {
      selectedParents.forEach((element,ind) => {
        // orgchart.current[ind].exportTo("pohon_kinerja", "pdf");
        // setNavActiveKey(`tab-${selectedParents?.[ind]?.value?.id_goals}`);
        setTimeout(async function () {
            // alert('VIDEO HAS STOPPED');
            setNavActiveKey(`tab-${selectedParents?.[ind]?.value?.id_goals}`);
            buff = await orgchart.current[ind].exportAllTo();
            const canvasWidth = Math.floor(buff.width);
            const canvasHeight = Math.floor(buff.height);
            // if(i == 0) {
              // let width = 0;
              // let height = 0;
              // let ori = "";
              // doc =
              //   canvasWidth > canvasHeight
              //     ? new jsPDF({
              //         orientation: "landscape",
              //         unit: "px",
              //         format: [canvasWidth, canvasHeight],
              //       })
              //     : new jsPDF({
              //         orientation: "portrait",
              //         unit: "px",
              //         format: [canvasHeight, canvasWidth],
              //       });
              // if(canvasWidth > canvasHeight) {
              //   width = canvasWidth;
              //   height = canvasHeight;
              //   ori = "landscape";
              // }else{
              //   width = canvasHeight;
              //   height = canvasWidth;
              //   ori = "portrait";
              // }
              // doc = new jsPDF({
              //   orientation: "landscape",
              //   unit: "px",
              //   format: "a4",
              // });
            // }
            // doc.addImage(buff.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0);
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const widthRatio = pageWidth / canvasWidth;
            const heightRatio = pageHeight / canvasHeight;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
            const marginX = (pageWidth - (canvasWidth*ratio)) / 2;
            const marginY = (pageHeight - (canvasHeight*ratio)) / 2;
            doc.addImage(buff.toDataURL("image/jpeg", 1.0), "JPEG", marginX, marginY, canvasWidth*ratio, canvasHeight*ratio);
            if(ind < selectedParents.length -1) {
              doc.addPage();
            }
            i++;
            // console.log(ind, selectedParents.length - 1);
            if (ind === selectedParents.length -1) resolve();
            // console.log(doc);
        }, 2000);
      });
    });
    loop.then(() => {
      doc.save("pohon_kinerja.pdf");
      setCardLoading(false);
    });
  };

  const exportToPDF = (index) => {
    orgchart.current[index].exportTo("pohon_kinerja", "pdf");
  };

  const exportToPNG = (index) => {
    // console.log(selectedParents);
    orgchart.current[index].exportTo("pohon_kinerja", "png");
    // orgchart.current[index].exportAllTo("pohon_kinerja", "pdf");
  };
  const exportToExcel = (parentId) => {
    TreeExcelDownload(currentUser.token, parentId).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "pohon_kinerja.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  const exportToCSV = (parentId) => {
    TreeCsvDownload(currentUser.token, parentId).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "pohon_kinerja.csv"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  const showIndikator = (index) => {
    // console.log(index);
    // console.log(trees);
    if(isShowInd) {
      setShowInd(false);
      setChartClass("myChart l2r");
    }else{
      setShowInd(true);
      setChartClass("myChart l2rind");
    }
  }
  const handleClicUpdkButton = (parentCanvas) => {
    console.log("parentCanvas", parentCanvas);
    const path = `${appRoot}/tree/treeadmin/${parentCanvas.id_goals}/update`;
    // console.log(path);
    history.push(path, {
      id: parentCanvas.id_goals,
      title: parentCanvas.title,
      desc: parentCanvas.desc_goals,
      startDate: parentCanvas.start_date,
      dueDate: parentCanvas.due_date,
      typeGoals: parentCanvas.type_goals,
      indikator: parentCanvas.indikator,
      status: parentCanvas.status_goals,
      idArea: parentCanvas.id_area,
      idCluster: parentCanvas.id_cluster,
      namaCluster: parentCanvas.nama_cluster,
      issueGoals: parentCanvas.issue_goals,
      parentFamily: parentCanvas.parent_family,
    });
  };
  const searchGoals = (inputValue, callback) => {
    FindCluster(currentUser.token, 1, inputValue)
      .then((response) => {
        if (response) {
          // console.log(response);
          if (response.responseCode === 200) {
            callback(response.responseData);
            return;
          } else {
            throw response;
          }
        } else {
          throw response;
        }
      })
      .catch((response) => {
        callback([]);
        toast.error(response.responseDesc || "Failed to fetch cluster", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  const fetchTree = (id_goals) => {
    setLoading(true);
    if (selectedSearch == null) {
      setSelectedTree(trees);
      setLoading(false);
      // console.log('tree',selectedTree);
      // console.log('trees',trees);
    } else {
      const trees_ = selectedTree;
      // console.log(selectedTree);
      TreeViewCluster(currentUser.token, id_goals, selectedSearch.id_cluster)
        .then((response) => {
          if (response) {
            // console.log(response);
            // if (response.responseCode === 200) {
            //   callback(response.responseData);
            //   return;
            // }
            trees_[id_goals] = response.responseData;
            setSelectedTree(trees_);
            setLoading(false);
            // console.log("trees", trees_);
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
  // console.log(currentUser.role != 'viewer' ? 1 : 0);
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
              <Col>
                  <div className={`btn-group`}>
                    <Button
                      onClick={() =>exportAllToPDF()}
                      variant="gradient-primary"
                      className="btn-icon btn-icon-end"
                      disabled={cardLoading}
                    >
                      <Spinner as="span" animation="border" size="sm" hidden={!cardLoading} show={cardLoading} />
                      <span>Export All as PDF</span>{" "}
                      <CsLineIcons icon="bookmark" />
                    </Button>
                  </div>
              </Col>
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
                              cacheOptions
                              value={selectedSearch}
                              placeholder="Search cluster here..."
                              loadOptions={debounce(searchGoals, 500)}
                              onChange={onSelectedSearch}
                              getOptionLabel={(e) => e.title_goals}
                              getOptionValue={(e) => e.id_goals}
                            />
                          </Col>
                          <Col lg="4" md="4" sm="4">
                            <div className="btn-group">
                              <Button
                                onClick={() =>
                                  onClickCluster(
                                    item.value.id_goals,
                                    selectedSearch
                                  )
                                }
                                variant="gradient-primary"
                                disabled={!selectedSearch}
                                className="btn-icon btn-icon-end"
                              >
                                <span>Set Cluster</span>{" "}
                                <CsLineIcons icon="bookmark" />
                              </Button>
                              <Button
                                disabled={!selectedSearch}
                                onClick={() => {
                                  onClickClearCluster(
                                    item?.value?.parent_family,
                                    item.value.id_goals
                                  );
                                  onSelectedSearch(null);
                                }}
                                variant="muted"
                                className="btn-icon btn-icon-end"
                              >
                                <span>Clear Cluster</span>{" "}
                                <CsLineIcons icon="close" />
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
                            chartClass={isChartClass}
                            NodeTemplate={MyNode}
                            pan
                            zoom
                            direction="l2r"
                            directionLevel={3}
                            indShow={isShowInd}
                            onClickNode={(clickedNode) =>
                              onNodeClicked(clickedNode)
                            }
                          />
                        )}
                        <DropdownButton
                          as={ButtonGroup}
                          title="More ..."
                          variant="primary"
                          style={{ position: "absolute", right: 20, top: 55 }}
                        >
                          <Dropdown.Item onClick={() => showIndikator(index)}>
                            Show/Hide Indikator
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => exportToPDF(index)}>
                            Export As PDF
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => exportToPNG(index)}>
                            Export As PNG
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              exportToExcel(
                                trees?.[item?.value?.id_goals]?.parent_family
                              )
                            }
                          >
                            Export As Excel
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              exportToCSV(
                                trees?.[item?.value?.id_goals]?.parent_family
                              )
                            }
                          >
                            Export As CSV
                          </Dropdown.Item>
                        </DropdownButton>
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
          <BtnGroupEdit 
            role = {currentUser.role}
            onclick = {() => {handleClicUpdkButton(nodeData);}}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default View;
