import { StorageAccountComponent } from "@app/shared/setup/nodes/datasources/azure/storage-account/storage-account.component";
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeDatasource extends PipelineNode{
    static type = 'DATASOURCE'
    static category = 'DATASOURCE'
    static template_name = 'DATASOURCE'
    static color = 'blue'
    static label = 'Generic Datasource'
    static ports = [{id:"OUTPUT",spot:go.Spot.Right}]
}

export class NodeStorageAcount extends NodeDatasource{
    static type = 'AZURE_STORAGE_ACCOUNT'
    static label = 'Storage Account'
    static template_name = 'AZURE_STORAGE_ACCOUNT'

    static component = StorageAccountComponent

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
                    {...options},
                    $(go.Panel, "Vertical",
                    // $(go.Shape, "Rectangle", {fill: this.color ,stroke: null,width: 6, stretch: go.GraphObject.Vertical, alignment: go.Spot.Left},),
                        $(go.Picture, { desiredSize: new go.Size(50, 50), source: "assets/images/svg/Storage-Accounts.svg" }),
                        $(go.Panel, "Auto",
                            $(go.TextBlock,
                                {
                                    name: 'TEXT',
                                    margin: 6, font: '11px Lato, sans-serif',
                                    stroke: "#000", maxSize: new go.Size(130, NaN),
                                    alignment: go.Spot.TopLeft
                                },
                                new go.Binding("text", "label")
                            )
                        )
                    ),
                    ...this.makePorts()
                )
    }


}
