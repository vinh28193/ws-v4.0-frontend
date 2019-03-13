import {Package} from './package';

export const PACKAGES: any = [
    {
        id: 123,
        package_code: '01312893174189',
        tracking_seller: 'WESFG67867546534',
        tracking_reference_1: '1233344442',
        tracking_reference_2: '2222222222222222',
        manifest_code: 'DEV',
        package_weight: 10000,
        package_change_weight: 23000,
        package_dimension_l: 90,
        package_dimension_w: 60,
        package_dimension_h: 85,
        seller_shipped: '2019-03-11 12:00:00',
        stock_in_us: '2019-03-12 12:00:00',
        stock_out_us: '2019-03-13 12:00:00',
        stock_in_local: '2019-03-14 12:00:00',
        lost: '2019-03-15 12:00:00',
        current_status: '2019-03-12 12:00:00',
        warehouse_id: '2019-03-12 12:00:00',
        orders: [
            {
                id: 'Mã đơn 1',
                product: [
                    {
                        name: 'Sản phẩm A1',
                        quantity: 1,
                        weight: 100,
                        warehouse_tag: 'CBTAG1',
                        customer: {
                            full_name: 'Khách A'
                        }
                    },
                    {
                        name: 'Sản phẩm A2',
                        quantity: null,
                        weight: null,
                        warehouse_tag: null,
                        customer: {
                            full_name: 'Khách A'
                        }

                    },
                    {
                        name: 'Sản phẩm A3',
                        quantity: null,
                        weight: null,
                        warehouse_tag: null,
                        customer: {
                            full_name: 'Khách A'
                        }
                    }
                ]
            },
            {
                id: 'Mã đơn 2', product: [
                    {
                        name: 'Sản phẩm A2',
                        quantity: 1,
                        weight: 200,
                        warehouse_tag: 'CBTAG2',
                        customer: {
                            full_name: 'Khách A'
                        }
                    },
                    {
                        name: 'Sản phẩm B1',
                        quantity: 2,
                        weight: null,
                        warehouse_tag: null,
                        customer: {
                            full_name: 'Khách B'
                        }
                    },
                    {
                        name: 'Sản phẩm B2',
                        quantity: 3,
                        weight: null,
                        warehouse_tag: null,
                        customer: {
                            full_name: 'Khách B'
                        }
                    }
                ]
            },
            {
                id: 'Mã đơn 3', product: [
                    {
                        name: 'Sản phẩm B1',
                        quantity: 1,
                        weight: 200,
                        warehouse_tag: 'CBTAG3',
                        customer: {
                            full_name: 'Khách B'
                        }
                    },
                    {
                        name: 'Sản phẩm C1',
                        quantity: 2,
                        weight: 3,
                        warehouse_tag: 'CBTAG4',
                        customer: {
                            full_name: 'Khách C'
                        }
                    },
                    {
                        name: 'Sản phẩm C2',
                        quantity: 3,
                        weight: null,
                        warehouse_tag: null,
                        customer: {
                            full_name: 'Khách C'
                        }
                    }
                ],
            }
        ],
    },
    {
        id: 456,
        package_code: '313123',
        tracking_seller: 'BTA45654654654',
        tracking_reference_1: '0000787679797',
        tracking_reference_2: '1313132435645646',
        manifest_code: 'DEV',
        package_weight: 10000,
        package_change_weight: 23000,
        package_dimension_l: 90,
        package_dimension_w: 60,
        package_dimension_h: 85,
        seller_shipped: '2019-03-12 12:00:00',
        stock_in_us: '2019-03-12 12:00:00',
        stock_out_us: '2019-03-12 12:00:00',
        stock_in_local: '2019-03-12 12:00:00',
        lost: '2019-03-12 12:00:00',
        current_status: '2019-03-12 12:00:00',
        warehouse_id: '2019-03-12 12:00:00',
        orders: [
            {
                id: 'Mã đơn 1',
                product: [
                    {
                        name: 'Sản phẩm A2',
                        quantity: 1,
                        weight: 100,
                        warehouse_tag: 'CBTAG1',
                        customer: {
                            full_name: 'Khách A'
                        }
                    },
                ],
            },
            {
                id: 'Mã đơn 4', product: [
                    {
                        name: 'Sản phẩm D1',
                        quantity: null,
                        weight: null,
                        warehouse_tag: null,
                        customer: {
                            full_name: 'Khách D'
                        }
                    },
                ],
            },
        ],
    }
];

