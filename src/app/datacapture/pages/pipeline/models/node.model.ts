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
    static color = 'grey';
    static background = 'white';
    static textcolor = 'black';
    static icon = '';
    static width = 180;
    static icontype = "";
    static fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif;';
    static component: any = PipelineNodeComponent;

    // PORTS USED FOR THE DATAGRID
    static ports: {id: string, spot: go.Spot}[] = [];

    constructor(){}

    public static validate(){

    }

    public static createNode(){
        return {
            key : String(new Date().getTime()),
            label: this.label,
            category: this.template_name,
            type: this.type
        };
    }

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
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
            fill: "white", strokeWidth: 1, stroke:"grey", desiredSize: new go.Size(15,15),
            portId: p.id, alignment: p.spot,
            fromLinkable: true, toLinkable: true
        })) 
    }

    public static createShape() {
        go.Shape.defineFigureGenerator("RoundedTopRectangle", function(shape, w, h) {
            // this figure takes one parameter, the size of the corner
            var p1 = 5;  // default corner size
            if (shape !== null) {
              var param1 = shape.parameter1;
              if (!isNaN(param1) && param1 >= 0) p1 = param1;  // can't be negative or NaN
            }
            p1 = Math.min(p1, w / 2);
            p1 = Math.min(p1, h / 2);  // limit by whole height or by half height?
            var geo = new go.Geometry();
            // a single figure consisting of straight lines and quarter-circle arcs
            geo.add(new go.PathFigure(0, p1)
                     .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
                     .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
                     .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
                     .add(new go.PathSegment(go.PathSegment.Line, w, h))
                     .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
            // don't intersect with two top corners when used in an "Auto" Panel
            geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1);
            geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0);
            return geo;
        });

        go.Shape.defineFigureGenerator("RoundedBottomRectangle", function(shape, w, h) {
            // this figure takes one parameter, the size of the corner
            var p1 = 5;  // default corner size
            if (shape !== null) {
              var param1 = shape.parameter1;
              if (!isNaN(param1) && param1 >= 0) p1 = param1;  // can't be negative or NaN
            }
            p1 = Math.min(p1, w / 2);
            p1 = Math.min(p1, h / 2);  // limit by whole height or by half height?
            var geo = new go.Geometry();
            // a single figure consisting of straight lines and quarter-circle arcs
            geo.add(new go.PathFigure(0, 0)
                     .add(new go.PathSegment(go.PathSegment.Line, w, 0))
                     .add(new go.PathSegment(go.PathSegment.Line, w, h - p1))
                     .add(new go.PathSegment(go.PathSegment.Arc, 0, 90, w - p1, h - p1, p1, p1))
                     .add(new go.PathSegment(go.PathSegment.Line, p1, h))
                     .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close()));
            // don't intersect with two bottom corners when used in an "Auto" Panel
            geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0);
            geo.spot2 = new go.Spot(1, 1, -0.3 * p1, -0.3 * p1);
            return geo;
          });
    }
}