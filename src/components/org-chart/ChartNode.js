import React, { useState, useRef, useEffect } from "react";
import PropTypes, { element } from "prop-types";
import { dragNodeService, selectNodeService } from "./service";
import "./ChartNode.css";

const propTypes = {
  datasource: PropTypes.object,
  NodeTemplate: PropTypes.elementType,
  draggable: PropTypes.bool,
  collapsible: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  changeHierarchy: PropTypes.func,
  onClickNode: PropTypes.func,
  loadData: PropTypes.func,
  onLoadData: PropTypes.func,
  direction: PropTypes.string,
  directionLevel: PropTypes.number,
  currLevel: PropTypes.number,
  indShow: PropTypes.bool,
};

const defaultProps = {
  draggable: false,
  collapsible: true,
  multipleSelect: false,
  indShow: false,
};

const ChartNode = ({
  isInitialExpanded,
  tree,
  datasource,
  NodeTemplate,
  draggable,
  collapsible,
  multipleSelect,
  changeHierarchy,
  onClickNode,
  loadData,
  onLoadData,
  direction,
  directionLevel,
  currLevel,
  indShow,
}) => {
  const node = useRef();
  // console.log(datasource.children.length > 0);
  const [isChildrenCollapsed, setIsChildrenCollapsed] = useState(false);
  const [topEdgeExpanded, setTopEdgeExpanded] = useState();
  const [rightEdgeExpanded, setRightEdgeExpanded] = useState();
  const [bottomEdgeExpanded, setBottomEdgeExpanded] = useState();
  const [leftEdgeExpanded, setLeftEdgeExpanded] = useState();
  const [allowedDrop, setAllowedDrop] = useState(false);
  const [selected, setSelected] = useState(false);
  let new_direction = "t2b";
  let ul_direction = "t2b";
  if(datasource.children !== undefined) {
    if(datasource.children.length > 0) {
      if(indShow) {
        new_direction = "t2b t2bind";
      }else{
        new_direction = "t2b";
      }
    }else{
      new_direction = direction;
      if(indShow) {
        new_direction = `${direction}ind ${direction}`;
      }else{
        new_direction = direction;
      }
    }
  }else{
    if(indShow) {
      new_direction = "t2b t2bind";
    }else{
      new_direction = "t2b";
    }
  }
  const nodeClass = [
    "oc-node",
    isChildrenCollapsed ? "isChildrenCollapsed" : "",
    allowedDrop ? "allowedDrop" : "",
    selected ? "selected" : "",
    new_direction,
  ].filter((item) => item).join(" ");
  if(datasource.children !== undefined) {
    if(datasource.children.length > 0) {
      if(datasource.children[0] !== undefined) {
        // console.log(datasource.children[0]["children"]);
        let hasLeaf = false;
        datasource.children.forEach(element => {
          if(element.children != undefined && element.children.length > 0) {
            // console.log(element.children);
            hasLeaf = true;
          }
        });
        if(!hasLeaf) {
          // if(datasource.children[0]["children"].length == 0) {
            ul_direction = direction;
            if(indShow) {
              ul_direction = `${direction}ind ${direction}`;
            }else{
              ul_direction = direction;
            }
          // }
        }
        // if(datasource.children[0]["children"] !== undefined) {
        //   if(datasource.children[0]["children"].length == 0) {
        //     ul_direction = direction;
        //     if(indShow) {
        //       ul_direction = `${direction}ind ${direction}`;
        //       direction = "l2rc";
        //     }else{
        //       ul_direction = direction;
        //       direction = "l2rc";
        //     }
        //   }else{
        //     if(node.current != undefined) { 
        //       if(node.current.parentNode != undefined) {
        //         if(node.current.parentNode.parentNode != undefined) {
        //           if(node.current.parentNode.parentNode.classList.contains('l2r')) {
        //             direction = "l2rc";
        //           }
        //         }
        //       }
        //     }
        //   }
        // }else{
        //   if(node.current != undefined) { 
        //     if(node.current.parentNode != undefined) {
        //       if(node.current.parentNode.parentNode != undefined) {
        //         if(node.current.parentNode.parentNode.classList.contains('l2r')) {
        //           direction = "l2rc";
        //         }
        //       }
        //     }
        //   }
        // }
      }
    }
  }
  
  const ulClass = [
    ul_direction,
    isChildrenCollapsed ? "hidden" : "",

  ].filter((item) => item).join(" ");

  useEffect(() => {
    const subs1 = dragNodeService.getDragInfo().subscribe((draggedInfo) => {
      if (draggedInfo) {
        setAllowedDrop(
          !document
            .querySelector("#" + draggedInfo.draggedNodeId)
            .closest("li")
            .querySelector("#" + node.current.id)
            ? true
            : false
        );
      } else {
        setAllowedDrop(false);
      }
    });

    const subs2 = selectNodeService
      .getSelectedNodeInfo()
      .subscribe((selectedNodeInfo) => {
        if (selectedNodeInfo) {
          if (multipleSelect) {
            if (selectedNodeInfo.selectedNodeId === datasource.id) {
              setSelected(true);
            }
          } else {
            setSelected(selectedNodeInfo.selectedNodeId === datasource.id);
          }
        } else {
          setSelected(false);
        }
      });

    return () => {
      subs1.unsubscribe();
      subs2.unsubscribe();
    };
  }, [multipleSelect, datasource]);

  const addArrows = (e) => {
    const node = e.target.closest("li");
    // console.log(node.parentNode.classList.contains("l2r"));
    if(!node.parentNode.classList.contains("l2r")) {
      const parent = node.parentNode.closest("li");
      const isAncestorsCollapsed =
        node && parent
          ? parent.firstChild.classList.contains("hidden")
          : undefined;
      const isSiblingsCollapsed = Array.from(node.parentNode.children).some(
        (item) => item.classList.contains("hidden")
      );

      setTopEdgeExpanded(!isAncestorsCollapsed);
      setRightEdgeExpanded(!isSiblingsCollapsed);
      setLeftEdgeExpanded(!isSiblingsCollapsed);
      setBottomEdgeExpanded(!isChildrenCollapsed);
    }
  };

  const removeArrows = () => {
    setTopEdgeExpanded(undefined);
    setRightEdgeExpanded(undefined);
    setBottomEdgeExpanded(undefined);
    setLeftEdgeExpanded(undefined);
  };

  const toggleAncestors = (actionNode) => {
    let node = actionNode.parentNode.closest("li");
    if (!node) return;
    const isAncestorsCollapsed = node.firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      // ??????????????????????????????
      actionNode.classList.remove("isAncestorsCollapsed");
      node.firstChild.classList.remove("hidden");
    } else {
      // ???????????????????????????????????????????????????????????????????????????
      const isSiblingsCollapsed = Array.from(
        actionNode.parentNode.children
      ).some((item) => item.classList.contains("hidden"));
      if (!isSiblingsCollapsed) {
        toggleSiblings(actionNode);
      }
      actionNode.classList.add(
        ...(
          "isAncestorsCollapsed" +
          (isSiblingsCollapsed ? "" : " isSiblingsCollapsed")
        ).split(" ")
      );
      node.firstChild.classList.add("hidden");
      // ????????????????????????????????????????????????????????????
      if (
        node.parentNode.closest("li") &&
        !node.parentNode.closest("li").firstChild.classList.contains("hidden")
      ) {
        toggleAncestors(node);
      }
    }
  };

  const topEdgeClickHandler = (e) => {
    e.stopPropagation();
    setTopEdgeExpanded(!topEdgeExpanded);
    toggleAncestors(e.target.closest("li"));
  };

  const addChildrenHandler = (children) => {
    onLoadData(datasource, children);
    setIsChildrenCollapsed(false);
    setBottomEdgeExpanded(true);
  };

  const bottomEdgeClickHandler = async (e) => {
    e.stopPropagation();
    if (loadData && !datasource.children) {
      const children = await loadData(datasource, tree);
      addChildrenHandler(children);
    } else {
      setIsChildrenCollapsed(!isChildrenCollapsed);
      setBottomEdgeExpanded(!bottomEdgeExpanded);
    }
  };

  const toggleSiblings = (actionNode) => {
    let node = actionNode.previousSibling;
    const isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some(
      (item) => item.classList.contains("hidden")
    );
    actionNode.classList.toggle("isSiblingsCollapsed", !isSiblingsCollapsed);
    // ??????????????????????????????
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
      node = node.previousSibling;
    }
    node = actionNode.nextSibling;
    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }
      node = node.nextSibling;
    }
    // ??????????????????????????????????????????????????????
    const isAncestorsCollapsed = actionNode.parentNode
      .closest("li")
      .firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      toggleAncestors(actionNode);
    }
  };

  const hEdgeClickHandler = (e) => {
    e.stopPropagation();
    setLeftEdgeExpanded(!leftEdgeExpanded);
    setRightEdgeExpanded(!rightEdgeExpanded);
    toggleSiblings(e.target.closest("li"));
  };

  const filterAllowedDropNodes = (id) => {
    dragNodeService.sendDragInfo(id);
  };

  const clickNodeHandler = (event) => {
    if (onClickNode) {
      onClickNode(datasource);
    }

    selectNodeService.sendSelectedNodeInfo(datasource.id);
  };

  const dragstartHandler = (event) => {
    const copyDS = { ...datasource };
    delete copyDS.relationship;
    event.dataTransfer.setData("text/plain", JSON.stringify(copyDS));
    // highlight all potential drop targets
    filterAllowedDropNodes(node.current.id);
  };

  const dragoverHandler = (event) => {
    // prevent default to allow drop
    event.preventDefault();
  };

  const dragendHandler = () => {
    // reset background of all potential drop targets
    dragNodeService.clearDragInfo();
  };

  const dropHandler = (event) => {
    if (!event.currentTarget.classList.contains("allowedDrop")) {
      return;
    }
    dragNodeService.clearDragInfo();
    changeHierarchy(
      JSON.parse(event.dataTransfer.getData("text/plain")),
      event.currentTarget.id
    );
  };

  return (
    <li className="oc-hierarchy">
      <div
        ref={node}
        id={datasource.id}
        className={nodeClass}
        draggable={draggable ? "true" : undefined}
        onClick={clickNodeHandler}
        onDragStart={dragstartHandler}
        onDragOver={dragoverHandler}
        onDragEnd={dragendHandler}
        onDrop={dropHandler}
        onMouseEnter={addArrows}
        onMouseLeave={removeArrows}
      >
        {NodeTemplate ? (
          <NodeTemplate nodeData={datasource} nodeIndShow={indShow}/>
        ) : (
          <>
            <div className="oc-heading">
              {datasource.relationship &&
                datasource.relationship.charAt(2) === "1" && (
                  <i className="oci oci-leader oc-symbol" />
                )}
              {datasource.name}
            </div>
            <div className="oc-content">{datasource.title}</div>
          </>
        )}
        {collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(0) === "1" && (
            <i
              className={`oc-edge verticalEdge topEdge oci ${
                topEdgeExpanded === undefined
                  ? ""
                  : topEdgeExpanded
                  ? "oci-chevron-down"
                  : "oci-chevron-up"
              }`}
              onClick={topEdgeClickHandler}
            />
          )}
        {collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(1) === "1" && (
            <>
              <i
                className={`oc-edge horizontalEdge rightEdge oci ${
                  rightEdgeExpanded === undefined
                    ? ""
                    : rightEdgeExpanded
                    ? "oci-chevron-left"
                    : "oci-chevron-right"
                }`}
                onClick={hEdgeClickHandler}
              />
              <i
                className={`oc-edge horizontalEdge leftEdge oci ${
                  leftEdgeExpanded === undefined
                    ? ""
                    : leftEdgeExpanded
                    ? "oci-chevron-right"
                    : "oci-chevron-left"
                }`}
                onClick={hEdgeClickHandler}
              />
            </>
          )}
        <i
          className={`oc-edge verticalEdge bottomEdge oci
               ${
                 bottomEdgeExpanded === undefined
                   ? ""
                   : bottomEdgeExpanded
                   ? "oci-chevron-up"
                   : "oci-chevron-down"
               }`}
          onClick={bottomEdgeClickHandler}
        />
      </div>
      {datasource.children && datasource.children.length > 0 && (
        <ul className={ulClass}>
          {datasource.children.map((node) => (
            <ChartNode
              tree={datasource}
              datasource={node}
              NodeTemplate={NodeTemplate}
              id={node.id}
              key={node.id}
              draggable={draggable}
              collapsible={collapsible}
              multipleSelect={multipleSelect}
              changeHierarchy={changeHierarchy}
              onClickNode={onClickNode}
              loadData={loadData}
              onLoadData={onLoadData}
              direction={direction}
              directionLevel={directionLevel}
              currLevel={currLevel}
              indShow={indShow}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

ChartNode.propTypes = propTypes;
ChartNode.defaultProps = defaultProps;

export default ChartNode;
