import { StorageAccountComponent } from "@app/shared/setup/nodes/datasources/azure/storage-account/storage-account.component";
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeDatasource extends PipelineNode{
    static type = 'DATASOURCE'
    static category = 'DATASOURCE'
    static template_name = 'DATASOURCE'
    static color = '#1ca5cc'
    static label = 'Generic Datasource'
    static ports = [{id:"OUTPUT",spot:go.Spot.RightCenter}]
}

export class NodeStorageAcount extends NodeDatasource{
    static type = 'AZURE_STORAGE_ACCOUNT'
    static label = 'Storage Account'
    static template_name = 'AZURE_STORAGE_ACCOUNT';
    static icon = 'assets/images/svg/storage.svg';

    static component = StorageAccountComponent

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Shape, "Rectangle", { fill: this.color, stroke: null,  desiredSize: new go.Size(40, 40) }),
                    $(go.Picture, { desiredSize: new go.Size(24, 24), source: this.icon, margin: 8 }),
                    ),
                    // $(go.TextBlock,
                    //     {
                        //         name: this.label,
                        //         margin: 6, font: "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB'",
                        //         stroke: "black", maxSize: new go.Size(130, NaN),
                        //         alignment: go.Spot.Center
                        //     },
                        //     new go.Binding("text", "label")
                        // ),
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 },new go.Binding("text", "color")))},
            ...this.makePorts(),
        )
    }


}
