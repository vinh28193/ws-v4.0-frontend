export class Package {
    id: number;
    package_code: string;
    tracking_seller: string;
    order_ids: string;
    tracking_reference_1: string;
    tracking_reference_2: string;
    manifest_code: string;
    package_weight: number;
    package_change_weight: number;
    package_dimension_l: number;
    package_dimension_w: number;
    package_dimension_h: number;
    seller_shipped: string;
    stock_in_us: string;
    stock_out_us: string;
    stock_in_local: string;
    lost: string;
    current_status: string;
    warehouse_id: string;
    orders: any;

}
