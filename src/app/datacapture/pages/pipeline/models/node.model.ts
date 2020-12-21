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
            category: this.category,
            type: this.type
        }
    }

    public static getNodeTemplate(options = {}){
        // return $(go.Node, 'Spot',
        // {
        //     ...options,
        //     contextMenu:
        //         $('ContextMenu',
        //         $('ContextMenuButton',
        //             $(go.TextBlock, 'Group'),
        //             { click: function(e, obj) { e.diagram.commandHandler.groupSelection(); } },
        //             new go.Binding('visible', '', function(o) {
        //             return o.diagram.selection.count > 1;
        //             }).ofObject())
        //         )
        //     },
        //     $(go.Panel, 'Auto',
        //     $(go.Shape, 'RoundedRectangle', { stroke: null, fill: this.color }),
        //     $(go.TextBlock, { margin: 8, },
        //         new go.Binding('text', 'label'))
        //     ),
        //     // Ports
        //     ...this.makePorts(),
        // );
         
        return $(go.Node, 'Spot',
                    {...options},
                    $(go.Panel, "Horizontal",
                        $(go.Shape, "Rectangle", {fill: this.color ,stroke: null,width: 6, stretch: go.GraphObject.Vertical, alignment: go.Spot.Left},),
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
            fill: "white", strokeWidth: 1, stroke:"grey", desiredSize: new go.Size(15,15),
            portId: p.id, alignment: p.spot,
            fromLinkable: true, toLinkable: true
        })) 
    }
}