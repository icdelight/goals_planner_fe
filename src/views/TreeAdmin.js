import React, { Component } from "react";
import { render } from "react-dom";
import SortableTree from "react-sortable-tree";
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
/* eslint-disable no-plusplus */
const alertNodeInfo = ({ node, path, treeIndex }) => {
    console.log(node);
    console.log(path);
    console.log(treeIndex);
    const objectString = Object.keys(node)
      .map((k) => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
      .join(",\n   ");
  
    alert(
      "Info passed to the button generator:\n\n" +
        `node: {\n   ${objectString}\n},\n` +
        `path: [${path.join(", ")}],\n` +
        `treeIndex: ${treeIndex}`
    );
};
const maxDepth = 3;
const title = 'Tree Admin Page';
const description = 'An page for configure the tree view.';

const breadcrumbs = [{ to: '', text: 'Home' }];

export default class TreeAdmin extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        treeData: [
          {
            id: 1,
            title: "Chicken",
            expanded: true,
            parent: 0,
            pic: "",
            start_date: "",
            end_date: "",
            children: [{ id: 2, title: "Egg", parent: 1 }, { id: 3, title: "Wings", parent: 1 }, { id: 4,  title: "Feet", parent: 1 }]
          }
        ],
        nodeClicked: false,
      };
    };

    handleNodeClick = (node) => {
        this.setState({
            nodeClicked: node
        });
    };

    handleTreeOnChange = (treeData) => {
        this.setState({ treeData });
    };

    handleClickButton = () => {
        const { treeData } = this.state;
        const loopData = '';
        // console.log(treeData.keys("children"));
        // treeData.forEach(
        //     function(d) {
        //         console.log(d);
        //         if(d.expanded) {
                    
        //         }
        //     }
        // );
        this.loopParseData(treeData,0);
    }

    loopParseData = (data,parent) => {
        let resJson = "";
        if(data) {
            data.forEach(
                function(d,idx,arr) {
                    if(d.expanded) {
                        // this.loopParseData(d);
                        console.log(`${d.title}, id : ${d.id}, parent : ${parent} Parent of : `);
                        resJson += `${d.title} Parent of : `;
                        this.loopParseData(d.children,d.id);
                    }else{
                        resJson += `${d.title}, id : ${d.id}, parent : ${parent}`;
                        console.log(`${d.title}, id : ${d.id}, parent : ${parent}`);
                    }
                }.bind(this)
            );
        }
    }
    
    
    render() {
        
        const { treeData, nodeClicked } = this.state;
        return (
            <div style={{ height: 500 }}>
                <HtmlHead title={title} description={description} />
                <Row>
                    <Col>
                        {/* Title Start */}
                        <section className="scroll-section" id="title">
                        <div className="page-title-container">
                            <h1 className="mb-0 pb-0 display-4">{title}</h1>
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        <Card className="mb-5" body>
                            <Card.Text>{description}</Card.Text>
                            <SortableTree
                                treeData={treeData}
                                onChange={this.handleTreeOnChange}
                                isVirtualized= {false}
                                maxDepth={maxDepth}
                                generateNodeProps={(rowInfo) => {
                                    const { node } = rowInfo;
                                    return {
                                        buttons: [
                                        <button
                                            type="button"
                                            key={node}
                                            className="btn-xs btn-outline-success"
                                            style={{
                                            verticalAlign: "middle"
                                            }}
                                            onClick={() => alertNodeInfo(rowInfo)}
                                        >
                                            ℹ
                                        </button>
                                        ],
                                        onClick: () => {
                                        this.handleNodeClick(node);
                                        },
                                        style:
                                        node === nodeClicked
                                            ? {
                                                border: "3px solid yellow"
                                            }
                                            : {}
                                    };
                                }}
                                />
                                <button type="button" onClick={this.handleClickButton}>
                                    Click Me
                                </button>
                        </Card>
                        </section>
                    {/* Title End */}
                    </Col>
                </Row>
                
            </div>
        );
    }
  }