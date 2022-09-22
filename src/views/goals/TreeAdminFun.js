import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import SortableTree from "react-sortable-tree";
import { Button, Alert, Row, Col, Card , Form, ButtonGroup} from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { TreeAdmin, RemapNode, FindTree } from '../../services/treeservice';
import { DEFAULT_PATHS } from '../../config';
import { elementType } from "prop-types";
import { URL_SERVICE } from 'config.js';
import axios from 'axios';

const TreeContainer = function() {

}
const TreeAdminFun = () => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const [treeData, getGoals] = useState('');
    const [selectData, setSelect] = useState('');
    const [canvas, setCanvas] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [nodeClicked, clickNode] = useState(true);
    const [show, setShow] = useState(false);
    const [dismissingAlertShow, setDismissingAlertShow] = useState(true);
    const [styleBackround, setStyleBack] = useState(true);
    const [styleColor, setStyleCol] = useState(true);
    const [indData, setInd] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAllGoals = () => {
      
      let result = [];
      const Signups  =  TreeAdmin(currentUser.token).then(function(response) {
        if(response) {
            // console.log(response);
          if(response.responseCode === 200) {
            toast.success(response.responseDesc, {
              position: "top-right",
              autoClose: 1000,
            });
            // console.log(response.responseData);
            result = response.responseData;
            // console.log(result);
            getGoals(result);
            // setShowBtn(false);
            setLoading(false);
            setDismissingAlertShow(false);
          }else{  
            toast.error(response.responseDesc, {
              position: "top-right",
              autoClose: 1000,
            });
            getGoals(result);
            setDismissingAlertShow(true);
            setLoading(false);
          }
        }
        // console.log(result);
      });
    }

    const fetchData = async (inputValue) => {
        let resp = [];
        let result = [];
        setSelect(resp);
        if(inputValue.length > 3) {
            FindTree(currentUser.token,inputValue).then(function(response) {
                if(response) {
                    // console.log(response);
                    if(response.responseCode === 200) {
                        result = response.responseData;
                        result.forEach(element => {
                            if(element !== null) {
                                const obj = {
                                    name: element.title_goals,
                                    description: element.desc_goals,
                                }
                                resp.push(obj);
                            }
                        });
                        setSelect(resp);
                        // console.log(resp);
                    }else{
                        toast.error(response.responseDesc, {
                            position: "top-right",
                            autoClose: 5000,
                        });
                    }
                }else{
                    toast.error(response.responseDesc, {
                        position: "top-right",
                        autoClose: 5000,
                    });
                }
            });
        }else{
            // toast.error('Minimum filter lebih dari 3 char.', {
            //     position: "top-right",
            //     autoClose: 5000,
            // });
        }
        // return (await axios.get(`${SERVICE_URL}/products`, { params: { term: inputValue } })).data;
        return selectData;
    };

    const fetchSelect = async (inputValue) => {
        const params = new URLSearchParams();
        params.append('search',inputValue);
        const header = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': `Bearer ${currentUser.token}`,
            }
        };
        return await (await axios.post( `${URL_SERVICE}goals/findgoals`, params, header)).data.data;
        // console.log(res);
        // return (await axios.post( `${URL_SERVICE}goals/findgoals`, params, header)).data;
    };

    const handleNodeClick = (node) => {
        // setState({
        //     // nodeClicked: node
            
        // });
        clickNode(node);
    };

    const handleTreeOnChange = (treeDataS) => {
        // setState({ treeData });
        getGoals(treeDataS);
    };

    const alertNodeInfo = ({ node, path, treeIndex }) => {
        // console.log(node);
        // console.log(path);
        // console.log(treeIndex);
        const objectString = Object.keys(node)
          .map((k) => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
          .join(",\n   ");
      
        // alert(
        //   "Info passed to the button generator:\n\n" +
        //     `node: {\n   ${objectString}\n},\n` +
        //     `path: [${path.join(", ")}],\n` +
        //     `treeIndex: ${treeIndex}`
        // );
        setCanvas(node);
        const ind = [];
        node.indikator.forEach((el) => {
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

        const styBack = node.type_goals.background !== null && node.type_goals.background !== "" ? node.type_goals.background : "";
        const styCol = node.type_goals.color !== null && node.type_goals.color !== "" ? node.type_goals.color : "";
        setStyleBack(styBack);
        setStyleCol(styCol);
        setInd(ind);
        handleShow();
    };

    const resJson = [];
    const loopParseData = (res,data,parent) => {
        if(data) {
            let obj = {};
            data.forEach(
                
                function(d,idx,arr) {
                    if(d.expanded) {
                        // this.loopParseData(d);
                        obj = {
                            id_goals:d. id,
                            parent_goals: parent,
                            title_goals: d.title,
                            pic_goals: currentUser.email,
                        };
                        // console.log(`${d.title}, id : ${d.id}, parent : ${parent} Parent of : `);
                        // resJson += `${d.title} Parent of : `;
                        // console.log(obj);
                        loopParseData(res,d.children,d.id);
                    }else{
                        obj = {
                            id_goals: d. id,
                            parent_goals: parent,
                            title_goals: d.title,
                            pic_goals: currentUser.email,
                        };
                        // resJson += `${d.title}, id : ${d.id}, parent : ${parent}`;
                        // console.log(`${d.title}, id : ${d.id}, parent : ${parent}`);
                        // console.log(obj);
                    }

                    res.push(obj);
                }

            );
        }
        return res;
    }

    const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetchSelect(inputValue));
        // resolve(fetchData(inputValue));
      }, 1000);
    });
    const formatOptionLabel = ({ id_goals, title_goals }) => (
        <div>
          <div className="clearfix" />
          <div>{title_goals}</div>
          {id_goals && <div className="text-muted" hidden="1">{id_goals}</div>}
        </div>
    );
    const getOptionValue = (option) => {
        return option.name;
    };
    const onChangeSelectedOption = (e) => {
        // console.log(e);
        const selectedOption = e.id_goals; // <--- you can get value from object directly
        setSelectedOption(selectedOption);
    };
    const handleClickButton = () => {
        // const { treeData } = this.state;
        // const loopData = '';
        // console.log(treeData.keys("children"));
        // treeData.forEach(
        //     function(d) {
        //         console.log(d);
        //         if(d.expanded) {
                    
        //         }
        //     }
        // );
        loopParseData(resJson,treeData,0);

    };

    const handleClickRemapButton = () => {
        const newMap = loopParseData(resJson,treeData,0);
        // console.log(newMap);
        const Remap  =  RemapNode(currentUser.token,newMap).then(function(response) {
            if(response) {
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
                // result = response.responseData;
                // console.log(result);
                // getGoals(result);
                // setLoading(false);
                getAllGoals();
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
              }
            }
          });
    };

    const handleClickCancleButton = () => {
        // const treeDatas = [...treeData];
        // console.log(treeDatas);
        // getGoals(treeDatas);
        getAllGoals();
    };

    const handleClickAddParentButton = (parentCanvas) => {
        // console.log(`${appRoot}/tree/treeadmf/addchild`);
        const path = `${appRoot}/tree/treeadmf/addchild`; 
        // console.log(path);
        history.push(path,{
            id: parentCanvas.id,
            title: parentCanvas.title
        });
    };

    const handleClicUpdkButton = (parentCanvas) => {
        const path = `${appRoot}/tree/treeadmf/updnode`; 
        // console.log(path);
        history.push(path,{
            id: parentCanvas.id,
            title: parentCanvas.title,
            desc: parentCanvas.description,
            startDate: parentCanvas.start_date,
            dueDate: parentCanvas.due_date,
            typeGoals: parentCanvas.type_goals,
            indikator: parentCanvas.indikator,
        });
    };

    const handleClickAddButton = (parentCanvas) => {
        // console.log(`${appRoot}/tree/treeadmf/addchild`);
        const path = `${appRoot}/tree/treeadmf/addchild`; 
        // console.log(path);
        history.push(path,{
            id: parentCanvas.id,
            title: parentCanvas.title
        });
    };

    
    const onSubmit = (values) => {
        const search = selectedOption;
        console.log(search);
    };


    useEffect(() => {
        getAllGoals();
    }, []);
    
    // const maxDepth = 5; 
    const title = 'Tree Admin Page';
    const description = 'An page for configure the tree view.';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    const validationSchema = Yup.object().shape({
        // searchField: Yup.string().required('Search is required'),
    });
    const initialValues = { searchField: '' };
    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (    
        <div className="App scroll-out">
            <HtmlHead title={title} description={description} />
            <div className="override-native overflow-auto sh-100 pe-3">
            <Row>
                <Col>
                    {/* Title Start */}
                    <section className="scroll-section" id="title">
                    <Row className="g-0">
                        <Col xs="auto" className="mb-2 mb-md-0 me-auto">
                        <div className="page-title-container">
                            <h1 className="mb-0 pb-0 display-4">{title}</h1>
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        </Col>
                        <div className="w-100 d-md-none" />
                        {/* <Col>
                        <Card className="mb-5" body> */}
                        {/* <Col xs="12" sm="6" md="auto" className="d-flex align-items-start justify-content-end order-3 order-sm-2">
                            <div className="g-0 row mb-3">
                                <div className="d-flex align-items-start justify-content-end justify-content-lg-start col-md col-12">
                                    <form id="searchForm" className="tooltip-end-bottom me-lg-auto w-md-auto search-input-container border border-separator col-12" onSubmit={handleSubmit}>
                                        <div className="input-group">
                                            <div width="500px">
                                                <AsyncSelect
                                                    // style={{width: `${(8*selectedOption2.length) + 100}px`}}
                                                    // Style={{width: `${(8*this.state.selectedOption2.length) + 100}px`}}
                                                    MenuPlacement="auto"
                                                    MenuPosition="fixed"
                                                    cacheOptions={false}
                                                    defaultOptions
                                                    classNamePrefix="react-select"
                                                    loadOptions={promiseOptions}
                                                    formatOptionLabel={formatOptionLabel}
                                                    getOptionValue={getOptionValue}
                                                    />
                                            </div>
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
                                </div>
                            </div> 
                        </Col> */}
                    </Row>
                    <Card className="mb-2" body>
                        <Card.Text>{description}</Card.Text>
                        <Form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                            <Row className="mb-2 filled tooltip-end-top">
                                <Col lg="2" md="3" sm="4">
                                    <Form.Label className="col-form-label">Filter Node</Form.Label>
                                </Col>
                                <Col sm="8" md="9" lg="10">
                                    <AsyncSelect
                                        MenuPlacement="auto"
                                        MenuPosition="fixed"
                                        cacheOptions={false}
                                        defaultOptions
                                        classNamePrefix="react-select"
                                        loadOptions={promiseOptions}
                                        formatOptionLabel={formatOptionLabel}
                                        getOptionValue={getOptionValue}
                                        onChange={onChangeSelectedOption}
                                        />
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col lg="2" md="3" sm="4" />
                                <Col sm="8" md="9" lg="10">
                                    <div className="btn-group">
                                        <Button type="submit" variant="outline-primary" className="mb-1">Search</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                        {/* <div className="g-0 row">
                            <div className="d-flex align-items-start justify-content-end justify-content-lg-start col-md col-12 mb-1">
                                
                                <form id="searchForm" className="tooltip-end-bottom me-lg-auto w-100 w-md-auto search-input-container border border-separator " onSubmit={handleSubmit}>
                                <div className="input-group w-100 w-md-auto">
                                    <AsyncSelect
                                        className="w-100 w-md-auto"
                                        width="500"
                                        cacheOptions={false}
                                        defaultOptions
                                        classNamePrefix="react-select"
                                        loadOptions={promiseOptions}
                                        formatOptionLabel={formatOptionLabel}
                                        getOptionValue={getOptionValue}
                                        />
                                    
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
                    </Card>
                    <Card className="mb-3" body>
                        {dismissingAlertShow && (
                            <Alert variant="alert" onClose={() => setDismissingAlertShow(false)}>
                            <strong>Data goals is empty! </strong> You should add Parent Node.
                            </Alert>
                        )}
                        <SortableTree
                            className="mb-3"
                            treeData={treeData}
                            onChange={handleTreeOnChange}
                            isVirtualized= {false}
                            // maxDepth={maxDepth}
                            generateNodeProps={(rowInfo) => {
                                const { node } = rowInfo;
                                // console.log(node);
                                return {
                                    buttons: [
                                    <button
                                        type="button"
                                        key={node}
                                        className="btn-xs btn-outline-default"
                                        style={{
                                            verticalAlign: "middle",
                                            background: node.type_goals.background !== null && node.type_goals.background !== "" ? node.type_goals.background : "",
                                            color: node.type_goals.color !== null && node.type_goals.color !== "" ? node.type_goals.color : "",
                                            width: "50px",
                                        }}
                                        onClick={() => alertNodeInfo(rowInfo)}
                                    >
                                        ℹ
                                    </button>
                                    ],
                                    onClick: () => {
                                        handleNodeClick(node);
                                    },
                                    style:
                                    node === nodeClicked
                                        ? {
                                            border: "3px solid yellow",
                                        }
                                        : {
                                            
                                        }
                                };
                            }}
                            />
                            <ButtonGroup aria-label="Basic outlined example">
                                <button type="button" onClick={() => handleClickRemapButton()} className="btn-icon btn-icon-start ms-1 btn btn-outline-primary">
                                    Submit New Map
                                </button>
                                <button type="button" onClick={() => handleClickCancleButton()} className="btn-icon btn-icon-start ms-1 btn btn-outline-warning">
                                    Cancel
                                </button>
                                {dismissingAlertShow && (
                                    <button type="button" onClick={() => handleClickAddParentButton()} className="btn-icon btn-icon-start ms-1 btn btn-outline-primary">
                                        Add Parent
                                    </button>
                                )}
                            </ButtonGroup>
                    </Card>
                    </section>
                {/* Title End */}
                </Col>
            </Row>
            <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
                <Offcanvas.Header closeButton className="row" style={{ backgroundColor:styleBackround, color: styleColor }}>
                    <small id="passwordHelpBlock" className="form-text text-muted sm-12">Title</small>
                    <Offcanvas.Title className="sm-12">
                        {canvas.title}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{background:"var(--background-navcolor-dark)"}}>
                    <Card className="mb-3" body style={{background:"rgba(255,255,255,.05) !important"}}>
                        <Card.Header className="pt-0 pb-1">
                            <div className="row mt-0 mb-0 d-flex align-items-start justify-content-end justify-content-lg-start">
                                <small id="passwordHelpBlock" className="form-text text-muted sm-12">PIC</small>
                                <span className="col-md col-6 sm-6">{canvas.firstName}</span>
                                <span className="col-md col-6 sm-6">{canvas.pic}</span>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="row mt-0 mb-0">
                                <small id="passwordHelpBlock" className="form-text text-muted sm-12">Description</small>
                                <span className="sm-12"><Card.Text>{canvas.description}</Card.Text></span>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row mt-0 mb-0">
                                <small id="passwordHelpBlock" className="form-text text-muted sm-12">Progress</small>
                                <span className="sm-12"><Card.Text>{canvas.progress}</Card.Text></span>
                            </div>
                        </Card.Body>
                        <Card.Footer className="pt-0 pb-1">
                            <div className="row mt-0 mb-0">
                                <small id="passwordHelpBlock" className="form-text text-muted sm-12 col-md col-6">Start Date</small>
                                <span className="col-md col-6 sm-12"><Card.Text>{canvas.start_date}</Card.Text></span>
                            </div>
                            <div className="row mt-0 mb-0">
                                <small id="passwordHelpBlock" className="form-text text-muted sm-12 col-md col-6">End Date</small>
                                <span className="col-md col-6 sm-12"><Card.Text>{canvas.due_date}</Card.Text></span>
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
                    <div className="btn-group">
                        <button type="button" onClick={() => {handleClickAddButton(canvas)}} className="btn-icon btn-icon-start ms-1 btn btn-outline-primary">
                            Add Child
                        </button>
                        <button type="button" onClick={() => {handleClicUpdkButton(canvas)}} className="btn-icon btn-icon-start ms-1 btn btn-outline-warning">
                            Update
                        </button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            </div>
        </div>
    )

};

export default TreeAdminFun;
