import { randomPosition } from "@app/shared/utils/strings.utils";
import * as go from "gojs";
import { PipelineNodeComponent } from "../componenets/pipeline-editor/pipeline-node/pipeline-node.component";

const $ = go.GraphObject.make;

export class PipelineNode{

    // NODE CATEGORY
    static type;
    static category;
    // TYPE SUB CATEGOGY THAT WILL BE USED TO REGISTER TEMPLATE
    static template_name;
    // DEFAULT LABEL OF THE NODE
    static label;
    // NODE COLORATION OR THEME
    static color = '#c8c811';
    static background = 'white';
    static textcolor = 'black';
    static icon = '';
    static width = 180;
    static icontype = "";
    static fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif;';
    static component: any = PipelineNodeComponent;

    // PORTS USED FOR THE DATAGRID
    public static getComponenent(node){
        return this.component
    }

    static ports: {id: string, spot: go.Spot}[] = [];

    constructor(){}

    public static validate(){

    }

    public static createNode(){
        return {
            key : String(new Date().getTime()),
            label: this.label,
            category: this.template_name,
            type: this.type,
            loc: randomPosition(200) + " " + randomPosition(200)
        };
    }

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Horizontal',
                $(go.Shape, 'Rectangle', {fill: this.color ,stroke: null,width: 6, stretch: go.GraphObject.Vertical, alignment: go.Spot.Left}),
                $(go.Panel, "Auto",
                            $(go.Shape, "Rectangle", { fill: "white", stroke: null }),
                            $(go.Panel, "Table",
                                { width: 130, minSize: new go.Size(NaN, 50) },
                                $(go.TextBlock,
                                    {
                                        name: 'TEXT',
                                        margin: 6, font: '11px Lato, sans-serif',
                                        stroke: "#000", maxSize: new go.Size(130, NaN),
                                        alignment: go.Spot.TopLeft
                                    },
                                    new go.Binding("text", "label")
                                ),
                                $(go.TextBlock,
                                    {
                                        text: this.type,
                                        margin: 6, font: '11px Lato, sans-serif',
                                        stroke: this.color, maxSize: new go.Size(130, NaN),
                                        alignment: go.Spot.BottomLeft
                                    },
                                )
                            )
                        )
                    ),
                    ...this.makePorts()
                )
    }

    public static makePorts() {
        return this.ports.map((p)=>$(go.Shape, 'Circle',
        {
            opacity: 1,
            fill: "white",
            strokeWidth: 1,
            stroke:"lightgrey",
            desiredSize: new go.Size(10,10),
            portId: p.id, 
            alignment: p.spot,
            fromLinkable: true,
            toLinkable: true
        })) 
    }
}