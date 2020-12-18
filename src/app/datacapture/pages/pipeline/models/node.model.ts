import * as go from "gojs";
import { PipelineNodeComponent } from "../componenets/pipeline-editor/pipeline-node/pipeline-node.component";

const $ = go.GraphObject.make;

export class PipelineNode{

    // TYPE OVERARCHING CATEGORY
    static type;
    // TYPE SUB CATEGOGY THAT WILL BE USED TO REGISTER TEMPLATE
    static category;
    // DEFAULT LABEL OF THE NODE 
    static label;
    // NODE COLORATION OR THEME
    static color = 'grey';

    static componenet = PipelineNodeComponent

    // PORTS USED FOR THE DATAGRID
    static ports: {id: string, spot: go.Spot}[] = []

    constructor(){}

    public static validate(){

    }

    public static createNode(){
        return {
            key : String(new Date().getTime()),
            label: this.label,
            color: this.color,
            category: this.category
        }
    }

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
        {
            ...options,
            contextMenu:
                $('ContextMenu',
                $('ContextMenuButton',
                    $(go.TextBlock, 'Group'),
                    { click: function(e, obj) { e.diagram.commandHandler.groupSelection(); } },
                    new go.Binding('visible', '', function(o) {
                    return o.diagram.selection.count > 1;
                    }).ofObject())
                )
            },
            $(go.Panel, 'Auto',
            $(go.Shape, 'RoundedRectangle', { stroke: null, fill: this.color }),
            $(go.TextBlock, { margin: 8, },
                new go.Binding('text', 'label'))
            ),
            // Ports
            ...this.makePorts(),
        );
    }

    public static makePorts() {
        return this.ports.map((p)=>$(go.Shape, 'Circle',
        {
            opacity: 1,
            fill: "#8d9db7", strokeWidth: 0, desiredSize: new go.Size(15,15),
            portId: p.id, alignment: p.spot,
            fromLinkable: true, toLinkable: true
        })) 
    }
}