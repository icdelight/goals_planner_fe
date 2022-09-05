import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Card, Nav, Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import useCustomLayout from 'hooks/useCustomLayout';
import 'react-datepicker/dist/react-datepicker.css';
import { useWindowSize } from 'hooks/useWindowSize';
import { toast } from 'react-toastify';
import { BlockPicker } from "react-color";
import { AddChildTreeService } from '../services/treeservice';
import { DEFAULT_PATHS } from '../config';
import { LAYOUT } from '../constants';

const RowInd = function(propss){
    const {value, onChange, onDelete} = propss;
    // console.log(props);
    return (
        <Row className="mb-2 filled tooltip-end-top">
            <Col lg="2" md="3" sm="4"> </Col>
            <Col sm="8" md="9" lg="10" height="200px">  
                <InputGroup>
                    <Form.Control name="ind" placeholder="Indikator" aria-label="" value={value} onChange={onChange}/>
                    <Button variant="outline-danger" onClick={onDelete}>
                        <CsLineIcons icon="multiply" />
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    );
}

const AddChildTree = (props) => {
    const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
    const history = useHistory();
    const states = props;
    const parent = states.location.state;
    // console.log(parent);
    // console.log(parent.title);
    const [startDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    useCustomLayout({ layout: LAYOUT.Boxed });
    const { width } = useWindowSize();
    const { currentUser, isLogin } = useSelector((state) => state.auth);
    const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");

    const { themeValues } = useSelector((state) => state.settings);
    const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);

    // const indik = parent.indikator !== null && parent.indikator !== "" ? parent.indikator : "";
    const rowsId = [];
    // console.log(indik);
    // indik.forEach((el) => {
    //     const obj = {value:el.indikator};
    //     rowsId.push(obj);
    // });
    // setRowState(rowsId);

    const [rowState, setRowState] = useState(rowsId);

    const title = 'Add Child Page';
    const description = 'An page for adding child the tree view node.';
    const breadcrumbs = [
        { to: ``, text: 'Home' },
        { to: `tree/treeadmf`, text: 'Tree Admin' },
    ];

    const handleClickBackButton = () => {
        const path = `${appRoot}/tree/treeadmf`; 
        // console.log(path);
        history.push(path);
    };

    const handleClickAddIndButton = () => {
        const rows = [...rowState];
        // rows = rowState;
        rows.push({value:''});
        // console.log('click button',rows);
        setRowState(rows);
        // console.log(newrows);
        // this.displayData.push(<div  id="display-data"><pre>{this.state.postVal}</pre></div>);
        // this.setState({
        //     showdata : this.displayData,
        //     postVal : ""
        // });
    };

    const updateValue = (e, idx) => {
        const rows = [...rowState];;  // copy array because we don't want to mutate the previous one
        rows[idx].value = e.target.value;
        // console.log('update value',rows);
        setRowState(rows);
    };

    const deleteRows = (val) => {
        const rows = [...rowState].filter(e => e.value !== val);
        // console.log(rows);
        setRowState(rows);
    }

    const validationSchema = Yup.object().shape({
        childTitle: Yup.string().required('Title is required'),
        childDesc: Yup.string().required('Description is required'),
        // startDate: Yup.string().required('Start date is required'),
        // dueDate: Yup.string().required('Due date is required'),
    });

    const initialValues = { childTitle: '', childDesc: '', startDate: '', dueDate: '', backCol: blockPickerColor};

    const onSubmit = (values) => {
        console.log('submit form', values);
        let textCol = "#000";
        const ind = [];
        if(blockPickerColor === "#697689" || blockPickerColor === "#555555") {
            textCol = "#fff";
        }
        const type = {
            "background" : blockPickerColor,
            "color": textCol,
        };
        const indRes = [];
        rowState.forEach((el, idx) => {
            const obj = {key:idx.toString(), indikator:el.value};
            indRes.push(obj);
        });
        const signin  =  AddChildTreeService(currentUser.token, values.childTitle, values.childDesc, currentUser.email, startDate, dueDate, parent.id, type, JSON.stringify(indRes)).then(function(response) {
        //   console.log(response);
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
              const path = `${appRoot}/tree/treeadmf`; 
              history.push(path);
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

    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, values, touched, errors } = formik;

    return (
        <div className="App" style={{ }}>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    {/* Title Start */}
                    <section className="scroll-section" id="title">
                    <div className="page-title-container">
                        <h1 className="mb-0 pb-0 display-4">{title}</h1>
                        <BreadcrumbList items={breadcrumbs} />
                    </div>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className="small-title">Parent Info</h2>

                    <Form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                    <Card className="mb-3">
                        <Card.Body className="p-3">
                                <Row>
                                    <Col lg="2" md="3" sm="4">
                                        <Form.Label className="col-form-label">Title Parent</Form.Label>
                                    </Col>
                                    <Col sm="8" md="9" lg="10">
                                        <Form.Label type="text" className="col-form-label" text={parent.title} name="parentTitle" id="parentTitle" value={parent.title} defaultValue={parent.title} readOnly={1}>{parent.title}</Form.Label>
                                        {errors.parentTitle  && touched.parentTitle && <div className="d-block invalid-tooltip">{errors.parentTitle}</div>}
                                        <Form.Label type="text" name="parentId" id="parentId" defaultValue={parent.id} value={parent.id} readOnly={1} hidden={1}/>
                                    </Col>
                                </Row>
                        </Card.Body>
                    </Card>
                    <h2 className="small-title">Child Info</h2>
                    <Card className="mb-2">
                        <Card.Body className="p-3">
                                <Row className="mb-2 filled tooltip-end-top">
                                    <Col lg="2" md="3" sm="4">
                                        <Form.Label className="col-form-label">Title Child</Form.Label>
                                    </Col>
                                    <Col sm="8" md="9" lg="10">
                                        <Form.Control type="text" name="childTitle" id="childTitle" values={values.childTitle} value={values.childTitle} onChange={handleChange}/>
                                        {errors.childTitle  && touched.childTitle && <div className="d-block invalid-tooltip">{errors.childTitle}</div>}
                                    </Col>
                                </Row>
                                <Row className="mb-2 filled tooltip-end-top">
                                    <Col lg="2" md="3" sm="4">
                                        <Form.Label className="col-form-label">Description Child</Form.Label>
                                    </Col>
                                    <Col sm="8" md="9" lg="10">
                                        <Form.Control type="text" name="childDesc" id="childDesc" values={values.childDesc} value={values.childDesc} onChange={handleChange}/>
                                        {errors.childDesc  && touched.childDesc && <div className="d-block invalid-tooltip">{errors.childDesc}</div>}
                                    </Col>
                                </Row>
                                <Row className="mb-2 filled tooltip-end-top">
                                    <Col lg="2" md="2" sm="2">
                                        <Form.Label className="col-form-label">Start Date</Form.Label>
                                    </Col>
                                    <Col sm="4" md="4" lg="4">
                                        {/* <Form.Control type="text" name="startDate" id="startDate" defaultValue=""/> */}
                                        <DatePicker className="form-control" name="startDates" id="startDates" value={startDate} values={startDate} selected={startDate} onChange={(date) => setStartDate(date)} />
                                        {errors.startDate  && touched.startDate && <div className="d-block invalid-tooltip">{errors.startDate}</div>}
                                    </Col>
                                    <Col lg="2" md="2" sm="2">
                                        <Form.Label className="col-form-label">Due Date</Form.Label>
                                    </Col>
                                    <Col sm="4" md="4" lg="4" >
                                        {/* <Form.Control type="text" name="dueDate" id="dueDate" defaultValue=""/> */}
                                        <DatePicker className="form-control" name="dueDates" id="dueDates" value={dueDate} values={dueDate} selected={dueDate} onChange={(date) => setDueDate(date)} />
                                        {errors.dueDate  && touched.dueDate && <div className="d-block invalid-tooltip">{errors.dueDate}</div>}
                                    </Col>
                                </Row>
                                <Row className="mb-2 filled tooltip-end-top">
                                    <Col lg="2" md="2" sm="2">
                                        <Form.Label className="col-form-label">Background-color</Form.Label>
                                    </Col>
                                    <Col sm="4" md="4" lg="4" height="200px">
                                        <Form.Control type="text" name="backCol" id="backCol" value={blockPickerColor} values={blockPickerColor} readOnly={1}  onChange={handleChange}/>
                                        {errors.backCol  && touched.backCol && <div className="d-block invalid-tooltip">{errors.backCol}</div>}
                                        <div className="blockpicker">
                                            <BlockPicker
                                                color={blockPickerColor}
                                                onChange={(color) => {
                                                    setBlockPickerColor(color.hex);
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-2 filled tooltip-end-top">
                                    <Col lg="2" md="3" sm="4">
                                        <Form.Label className="col-form-label">Indikator</Form.Label>
                                    </Col>
                                    <Col sm="8" md="9" lg="10" height="200px">  
                                        <InputGroup>
                                            {/* <Form.Control name="ind" placeholder="Indikator" aria-label="" /> */}
                                            <Button variant="outline-primary" onClick={() => handleClickAddIndButton()}> 
                                                <CsLineIcons icon="plus" />
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                {/* <Row className="mb-2 filled tooltip-end-top">
                                    <Col lg="2" md="3" sm="4"> </Col>
                                    <Col sm="8" md="9" lg="10" height="200px">  
                                        <InputGroup>
                                            <Form.Control name="ind" placeholder="Indikator" aria-label="" />
                                            <Button variant="outline-danger">
                                                <CsLineIcons icon="multiply" />
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                </Row> */}
                                <div className="display-data-Container">
                                    {rowState.map((row, idx) => {
                                        return(
                                            <RowInd 
                                            key={idx}
                                            value={row.value}
                                            onChange={(e) => updateValue(e, idx)} 
                                            onDelete={(e) => deleteRows(row.value)}
                                            /> 
                                        )
                                    })
                                }
                                </div>
                                <Row className="mt-5">
                                    <Col lg="2" md="3" sm="4" />
                                    <Col sm="8" md="9" lg="10">
                                        <div className="btn-group">
                                            <Button type="submit" variant="outline-primary" className="mb-1">Submit</Button>
                                            <Button id="backButton" name="backButton" type="button" variant="outline-warning" className="mb-1" onClick={handleClickBackButton}>Back</Button>
                                        </div>
                                    </Col>
                                </Row>
                        </Card.Body>
                    </Card>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default AddChildTree;
