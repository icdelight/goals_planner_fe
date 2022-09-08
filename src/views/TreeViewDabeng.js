import React, { useEffect, useState, useRef } from "react";
import OrganizationChart from "@dabeng/react-orgchart";
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import MyNode from "../components/node/mynode";
import { TreeView } from '../services/treeservice';
import { Signup } from '../services/signin';
import { DEFAULT_PATHS } from '../config';


let handleClick = null;
let NodeClicked = null;

const TreeViewDabeng = () => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const ref = useRef(null);
    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const [ds, getGoals] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [nodeData, setNode] = useState(true);
    const [indData, setInd] = useState(true);
    const [styleBackround, setStyleBack] = useState(true);
    const [styleColor, setStyleCol] = useState(true);
    const [show,setShow] = useState(false);
 
    const CompClose = () => setShow(false);
    const CompShow = () => setShow(true);

    const getAllGoals = () => {
      
      setLoading(true);
      let result = null;
      const Signups  =  TreeView(currentUser.token).then(function(response) {
        if(response) {
          // console.log(response);
          if(response.responseCode === 200) {
            toast.success(response.responseDesc, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // console.log(response.responseData);
            result = response.responseData;
            // console.log(result.type_goals);
            getGoals(result);
            setLoading(false);
          }else{  
            toast.error(response.responseDesc, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
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
    }

    useEffect(() => {
      getAllGoals();
    }, []);

    const onSubmit = (values) => {
      // console.log(values);
      // const chart = document.getElementsByClassName('myChart');
      // // chart[0].classLiss;
      // // console.log(chart[0].getAttribute('class'));
      // chart[0].setAttribute('class',`${chart[0].getAttribute('class')} noncollapsable`);
      // // console.log(chart[0]);
      // chart[0].querySelectorAll(["classname=node"]).forEach();
    }

    handleClick = async () => {
       
    }

    NodeClicked = (nodes) => {
      CompShow();
      const ind = [];
      if(nodes !== undefined && nodes && nodes.length > 0) {
        nodes.indikator.forEach((el) => {
          ind.push(
            <Row className="g-0 py-1" key={el.key}>
            <Col xs="auto">
              <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                <div className="sh-3">
                  <CsLineIcons icon="dashboard-1" className="text-primary align-top" />
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                <div className="d-flex flex-column">
                  <div className="text-alternate mt-n1 lh-1-25" style={{fontSize: '12px'}}>{el.indikator}</div>
                </div>
              </div>
            </Col>
          </Row>
          );
        });
      }
      // console.log(nodes.type_goals);
      const styBack = null;
      const styCol = null;
      if(nodeData.type_goals !== undefined) {
        styBack = nodes.type_goals.background !== null && nodes.type_goals.background !== "" ? nodes.type_goals.background : "";
        styCol = nodes.type_goals.color !== null && nodes.type_goals.color !== "" ? nodes.type_goals.color : "";
      }
      setStyleBack(styBack);
      setStyleCol(styCol);
      setInd(ind);
      setNode(nodes);
    }

    const validationSchema = Yup.object().shape({
      searchField: Yup.string().required('Search is required'),
    });
    const initialValues = { searchField: '' };
    const title = 'Tree Views Page';
    const description = 'An page for view all goals as a tree view.';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

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
                    {/* <Card className="mb-5" body>
                        <Card.Text>{description}</Card.Text> */}
                      {/* <div className="g-0 row">
                          <div className="d-flex align-items-start justify-content-end justify-content-lg-start col-md col-12">
                              <form id="searchForm" className="tooltip-end-bottom me-lg-auto w-100 w-md-auto search-input-container border border-separator " onSubmit={handleSubmit}>
                              <div className="input-group">
                                <Form.Control id="searchField" className="" placeholder="Search" value={values.searchField} onChange={handleChange} />
                                <button id="button-addon" type="submit" className="btn btn-outline-secondary">
                                  <span className="search-magnifier-icon pe-none">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cs-icon search ">
                                        <circle cx="9" cy="9" r="7"> </circle>
                                        <path d="M14 14L17.5 17.5"> </path>
                                      </svg>
                                  </span>
                                </button>
                              </div>
                              </form> 
                              <button type="button" className="btn-icon btn-icon-start ms-1 btn btn-outline-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cs-icon plus ">
                                  <path d="M10 17 10 3M3 10 17 10"> </path>
                                </svg> 
                                <span>Go to Top</span>
                              </button>
                          </div>
                      </div> */}
                    <div className="scroll-section EmptyDiv os-host os-host-foreign os-host-resize-disabled os-host-scrollbar-vertical-hidden os-host-transition"> 
                      
                      <OrganizationChart
                          id="chartTree"
                          datasource={ds}
                          chartClass="myChart"
                          NodeTemplate={MyNode}
                          onClickNode={(clickedNode)=>NodeClicked(clickedNode)}
                      />
                    </div>
                        {/* </Card> */}
                    </section>
                {/* Title End */}
                <button type="button" onClick={() => handleClick()} className="btn-icon btn-icon-start ms-1 btn btn-outline-primary">
                    Click Me
                </button>
                </Col>
            </Row>

            <Offcanvas show={show} onHide={CompClose} placement="end" name="end">
              <Offcanvas.Header closeButton className="row" style={{ backgroundColor:styleBackround, color: styleColor }}>
                  <small id="passwordHelpBlock" className="form-text text-muted sm-12">Title</small>
                  <Offcanvas.Title className="sm-12">
                      {nodeData.title_goals}
                  </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body style={{background:"var(--background-navcolor-dark)"}}>
              <Card className="mb-3" body style={{background:"rgba(255,255,255,.05) !important"}}>
                <Card.Header className="pt-0 pb-1">
                    <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                        <small id="passwordHelpBlock" className="form-text text-muted sm-12">PIC</small>
                        <span className="col-md col-6 sm-6">{nodeData.pic_goals}</span>
                        <span className="col-md col-6 sm-6"> </span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="row mt-0 mb-0">
                        <small id="passwordHelpBlock" className="form-text text-muted sm-12">Description</small>
                        <span className="sm-12"><Card.Text>{nodeData.desc_goals}</Card.Text></span>
                    </div>
                </Card.Body>
                <Card.Body>
                    <div className="row mt-0 mb-0">
                        <small id="passwordHelpBlock" className="form-text text-muted sm-12">Progress</small>
                        <span className="sm-12"><Card.Text>{nodeData.progress}</Card.Text></span>
                    </div>
                </Card.Body>
                <Card.Footer className="pt-0 pb-1">
                    <div className="row mt-0 mb-0">
                        <small id="passwordHelpBlock" className="form-text text-muted sm-12 col-md col-6">Start Date</small>
                        <span className="col-md col-6 sm-12"><Card.Text>{nodeData.start_date}</Card.Text></span>
                    </div>
                    <div className="row mt-0 mb-0">
                        <small id="passwordHelpBlock" className="form-text text-muted sm-12 col-md col-6">End Date</small>
                        <span className="col-md col-6 sm-12"><Card.Text>{nodeData.due_date}</Card.Text></span>
                    </div>
                </Card.Footer>
              </Card>
              <Card className="mb-3" body style={{background:"rgba(255,255,255,.05) !important"}}>
                <Card.Header className="pt-0 pb-1">
                    <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                        <small id="passwordHelpBlock" className="form-text text-muted sm-12">Indikator : </small>
                    </div>
                </Card.Header>
                <Card.Body className="mb-n2 py-1">
                  {indData}
                </Card.Body>
              </Card>
              </Offcanvas.Body>
            </Offcanvas>
        </div>
      
    );
};
  
  export default TreeViewDabeng;