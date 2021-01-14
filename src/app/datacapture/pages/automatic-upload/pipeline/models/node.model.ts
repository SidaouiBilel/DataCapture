import { randomPosition } from "@app/shared/utils/strings.utils";
import * as go from "gojs";
import { PipelineNodeComponent } from "../componenets/pipeline-editor/pipeline-node/pipeline-node.component";

const $ = go.GraphObject.make;

export class PipelineNode{

    // NODE CATEGORY MUST BE UNIQUE FOR EACH CLASS(USED TO FETCH CLASS )
    static type;
    // NODE CATEGORY
    static category;
    // DEFAULT LABEL OF THE NODE
    static label;
    static shape = 'Circle'
    static showLabel = false


    // NODE COLORATION OR THEME
    static color = '#c8c811';
    static background = 'white';
    static textcolor = 'black';
    static icon = '';
    static width = 180;
    static icontype = "";
    static fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif;';
    static component: any = null;

    // PORTS USED FOR THE DATAGRID
    public static getComponenent(node){
        return this.component
    }

    public static setComponenet(c){
        this.component = c
        return this
    }

    static ports: {id: string, spot: go.Spot}[] = [];

    constructor(){}

    public static validate(){

    }

    public static createNode(){
        return {
            key : String(new Date().getTime()),
            label: this.label,
            type: this.type,
            loc: randomPosition(200) + " " + randomPosition(200)
        };
    }

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Shape, this.shape, { fill: this.color, stroke: null,  desiredSize: new go.Size(50, 50) }),
                    this.makeIcon(),
                )
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 }))},
            ...this.makeLabels(),
            ...this.makePorts()
        )
    }

    public static makePorts() {
        return this.ports.map((p)=>$(go.Shape, 'Circle',
        {
            opacity: 1,
            fill: this.color,
            strokeWidth: 2,
            stroke:"white",
            desiredSize: new go.Size(10,10),
            portId: p.id, 
            alignment: p.spot,
            fromLinkable: true,
            toLinkable: true
        })) 
    }

    public static makeIcon(){
        return  $(go.Picture, { desiredSize: new go.Size(32, 32), source: this.icon, margin: 8 })
    }

    public static makeLabels(){
        if(this.showLabel){
            return [
                $(go.Panel,{padding:4 , alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top},
                    $(go.TextBlock, { text: this.label, stroke:'grey'}, new go.Binding("text", "label") )
                )
                
            ]
        }else{
            return []
        }
    }
}