import {SalesArea} from "./common";

export class SalesDocument {

    constructor() {
      //
    }

    /*
     * Sales order id
     * @sap-field(VBELN)
     */
    documentId: string = "";
    customer: string = "";
    salesArea: SalesArea = {
        salesOrganization: "",
        salesChannel: "",
        salesDivision: ""
    };


    meta: {
        /*
         * Creation Date
         * @sap-field(ERDAT)
         */
        creationDate: Date;


        /*
         * Last change date
         */
        changeDate: Date;

        /*
         * Creator of the document
         * @sap-field(ERNAM)
         */
        creator: string;

        documentDate: Date;

        /*
         * Document category
         */
        category: string;

        transactionGroup: string;

        documentType: string;

        documentClass: string;

        documentIndicator: string;

        statistics: {
            /*
             * Update group for statistics update
             */
            group: string;

            /*
             * Statistics currency
             */
            currency: string;
        }

        /*
         * Internal object number
         */
        objectNumber: string;

        /*
         * Document category of preceding SD document
         */
        precedingDocumentCategory: string;

        /*
         * Sales document version number
         */
        version: string;

        crmGuid: string;

    } = {
        creationDate: new Date(0),
        changeDate: new Date(0),
        creator: "",
        documentDate: new Date(0),
        category: "",
        transactionGroup: "",
        documentType: "",
        documentClass: "",
        documentIndicator: "",
        statistics: {
            group: "",
            currency: ""
        },
        objectNumber: "",
        precedingDocumentCategory: "",
        version: "",
        crmGuid: ""
    };

    pricing: {

        /*
         * Sales and Distribution: Pricing Procedure in Pricing
         */
        schema: string;

        /*
         * Number of the document condition
         */
        document: string;

        /*
         * Hierarchy type for pricing
         */
        customerHierarchyType: string;
    } = {
        schema: "",
        document: "",
        customerHierarchyType: ""
    }


    shipping: {
        /*
         * Shipping Conditions
         */
        conditions: string;
    }
        = {
        conditions: ""
    }

    billing: {
        proposedType: string;
    }
        = {
        proposedType: ""
    }


    /*
     * Validity of the quotation
     */
    validity: {
        start: Date;
        end: Date;
        agreementStart: Date;
        agreementEnd: Date;
    }
        = {
        start: new Date(0),
        end: new Date(0),
        agreementStart: new Date(0),
        agreementEnd: new Date(0)
    }

    /*
     * Reason for order
     */
    reason: string = "";

    /*
     * Warranty start date
     */
    warrantyDate: Date = new Date(0);

    /*
     * Collective number (SD)
     */
    submission: string = "";

    /*
     * Delivery block (document header)
     */
    deliveryBlock: string = "";

    /*
     * Billing block in SD document
     */
    billingBlock: string = "";


    value: {
        net: number;
        gross: number;
        currency: string;
        exchangeRate: number;
    } = {
        net: 0,
        gross: 0,
        currency: "",
        exchangeRate: 0
    };

    /*
     * Sales Group
     */
    salesGroup: string = "";

    /*
     * Sales Office
     */
    salesOffice: string = "";

    /*
     * Business Area
     */
    businessArea: string = "";

    /*
     * Business area from cost center
     */
    costCenterArea: string = "";


    delivery: {
        /*
         * Requested delivery date
         */
        requestedDate: Date;

        /*
         * Proposed date type
         */
        dateType: string;

        /*
         * Complete delivery ?
         */
        complete: boolean;

        /*
         * Schedule Usage Indicator
         */
        releaseIndicator: string;

        /*
         * MRP for delivery schedule types
         */
        scheduleType: string;

        proposedScheduleTime: number;

        /*
         * Cml delivery order qty date
         */
        cumulativeDeliveryDate: Date;

        /*
         * Material Staging/Availability Date
         */
        masterAvailabilityDate: Date;

        /*
         * Sales document version number
         */
    } = {
        requestedDate: new Date(0),
        dateType: "",
        complete: false,
        releaseIndicator: "",
        scheduleType: "",
        proposedScheduleTime: 0,
        cumulativeDeliveryDate: new Date(0),
        masterAvailabilityDate: new Date(0)
    };

    /*
     * Sales probability
     */
    salesProbability: number = 0;

    /*
     * Search term for product proposal
     */
    productProposalSearchTerm: string = "";

    customerReference: {
        /*
         * Customer purchase order number
         */
        purchaseOrder: string;

        purchaseOrderItem: string;

        purchaseOrderSupplement: string;

        /*
         * Customer purchase order type
         */
        purchaseType: string;

        /*
         * Customer purchase order date
         */
        purchaseDate: Date;

        /*
         * Your reference
         */
        externalReference: string;

        /*
         * Orderer name
         */
        orderer: string;

        shipToPartyPurchaseOrder:string;

        shipToPartyPurchaseOrderItem:string;

        shipToPartyPurchaseType:string;

        shipToPartyPurchaseDate:Date;

        shipToPartyPurchaseReference:string;

        telephone:string;

    } = {
        purchaseOrder: "",
        purchaseOrderItem: "",
        purchaseOrderSupplement: "",
        purchaseType: "",
        purchaseDate: new Date(0),
        externalReference: "",
        orderer: "",
        shipToPartyPurchaseOrder: "",
        shipToPartyPurchaseOrderItem: "",
        shipToPartyPurchaseType: "",
        shipToPartyPurchaseDate: new Date(0),
        shipToPartyPurchaseReference: "",
        telephone: ""
    };

    dunning: {
        /*
         * Dunning count
         */
        count: number;

        /*
         * Dunning date
         */
        date: Date;

        key: string;
        block: string;
    }
        = {
        count: 0,
        date: new Date(0),
        key:"",
        block:""
    };

    costCenter: string = "";

    customerGroups: string[] = [];

    /*
     * Agreement (various conditions grouped together)
     */
    agreementConditions: string = "";

    /*
     * Controlling Area
     */
    controllingArea: string = "";

    /*
     * Work Breakdown Structure Element (WBS Element)
     */
    wbsElement: string = "";


    credit: {
        /*
         * Credit Control Area
         */
        controlArea: string;

        /*
         * Customer's account number with credit limit reference
         */
        account: string;

        /*
         * Customer Credit Group
         */
        group: string;

        /*
         * Credit representative group for credit management
         */
        representativeGroup: string;

        /*
         * Credit management: Risk category
         */
        riskCategory: string;

        /*
         * Currency key of credit control area
         */
        currency: string;

        /*
         * Release date of the document determined by credit management
         */
        releaseDate: Date;

        /*
         * Date of next credit check of document
         */
        nextCheckDate: Date;

        /*
         * Next date
         */
        nextDate: Date;

        /*
         * Released credit amount
         */
        releaseAmount: number;

    } = {
        controlArea: "",
        account: "",
        group: "",
        representativeGroup: "",
        riskCategory: "",
        currency: "",
        releaseDate: new Date(0),
        nextCheckDate: new Date(0),
        nextDate: new Date(0),
        releaseAmount: 0
    };

    /*
     * Document number of the reference document
     */
    referenceDocument: string = "";

    /*
     * Company code to be billed
     */
    companyCode: string = "";

    tax: {
        /*
         * Alternative tax classification
         */
        alternativeClassification: string;

        customerClassifications: string[];

        destinationCountry: string;

        departureCountry: string;

        triangularDeal: boolean;
    } = {
        alternativeClassification: "",
        customerClassifications: [],
        destinationCountry: "",
        departureCountry: "",
        triangularDeal: false
    }

    /*
     * Reference Document Number
     */
    reference: string = "";

    /*
     * Assignment number
     */
    assignment: string = "";

    /*
     * Search procedure for batch determination
     */
    batchDeterminationProcedure: string = "";

    /*
     * Accrual period for order-related billing docs.to be accrued
     */
    accrualPeriod: number = 0;

    /*
     * Order Number
     */
    productionOrder: string = "";

    /*
     * Quality Notification number
     */
    qualityNotification: string = "";

    /*
     * Master contract number
     */
    masterContract: string = "";

    /*
     * Referencing requirement: Procedure
     */
    referencingProcedure: string = "";

    /*
     * Check partner authorizations
     */
    checkPartnerAuthorization: boolean = false;

    /*
     * Pick up date & time
     */
    pickupDates: Date[] = [];

    /*
     * Number of payment card plan type
     */
    paymentCardPlan: string = "";

    masterContractBlock: string = "";


    priceGroup: string = "";


    customerGroup:string = "";


    salesDistrict:string = "";

    priceList: string = "";

    incoterms: {
        code:string;
        place: string;
    } = {
        code: "",
        place: ""
    };

    orderCombination: string = "";

    invoiceCalendar: {
        dates: string;
        schedule:string;
    } = {
        dates: "",
        schedule:""
    };

    /*
     * Promotion
     */
    promotion: string = "";

    crmGuid:string = "";

    manualInvoice:boolean = false;

    additionalValueDays:number = 0;

    fixedValueDate:Date = new Date(0);

    paymentMethod:string = "";

    paymentTerms:string = "";

    customerAccountAssignmentGroup:string = "";

    pricingDate:Date = new Date(0);

    billingDate:Date = new Date(0);

    renderedServiceDate:Date = new Date(0);

    fiscalYear:number = 0;

    postingPeriod:number = 0;

    invoicePlan: string = "";

    paymentGuaranteeProcedure: string = "";

    internalFinancialDocument: string = "";

    departmentNumber: string = "";

    receivingPoint:string = "";

    customerConditionGroup:string[] = [];
}

export class SalesDocumentItem {

    documentId: string = "";

    itemId: string = "";

    /**
     * Sales document item category
     * SAP field: POSNR
     */
    category: string = "";

    /**
     * Item type
     * SAP field: POSAR
     */
    type: string = "";


    /**
     * Relevancy indicators for delivery, billing
     */
    relevancy: {
        /**
         * Relevant for Billing
         * SAP field: LFREF
         */
        delivery: boolean;

        /**
         * Item is relevant for delivery
         * SAP field: FKREL
         */
        billing: boolean;
    } = {
        delivery: false,
        billing: false
    }

    /**
     * Material number
     * SAP field: MATNR
     */
    material: string = "";

    /**
     * Entered material
     * @type {string}
     */
    requestedMaterial: string = "";

    /**
     * Pricing Reference Material<BR>
     * SAP field: PMATN
     */
    pricingMaterial: string = "";

    /**
     * Batch Number
     */
    batch: string = "";

    /**
     * Material Group
     */
    materialGroup: string = "";


    quantity: {
        ordered: number;
        target: number;
        requiredForDelivery: number;
        confirmed: number;
        confirmedBaseUnit: number;
        scale: number;
        roundingDelivery: number;
        allowedDeviation: number;
        allowedPercentageDeviation: number;
        fixed: boolean;
        unlimitedOverdelivery: boolean;
        overdeliveryLimit: number;
        underdeliveryLimit: number;
        component: number;
    } = {
        ordered: 0,
        target: 0,
        requiredForDelivery: 0,
        confirmed: 0,
        confirmedBaseUnit: 0,
        scale: 0,
        roundingDelivery: 0,
        allowedDeviation: 0,
        allowedPercentageDeviation: 0,
        fixed: false,
        unlimitedOverdelivery: false,
        overdeliveryLimit: 0,
        underdeliveryLimit: 0,
        component: 0
    }

    weight: {
        gross: number;
        net: number;
        unit: string;
    } = {
        gross: 0,
        net: 0,
        unit: ""
    }

    volume: {
        value: number;
        unit: string;
    } = {
        value: 0,
        unit: ""
    }

    materialDescription: {
        short: string;
        long: string;
    } = {
        short: "",
        long: ""
    }

    meta: {
        creationDate: Date;

        changeDate: Date;

        creator: string;

        creationTime: number;

        statistics: {
            group: string;
            date: Date;
        }
    } = {
        creationDate: new Date(0),
        changeDate: new Date(0),
        creator: "",
        creationTime: 0,
        statistics: {
            group: "",
            date: new Date(0)
        }
    }

    /**
     * Days by which the quantity can be shifted
     */
    shiftDays: number = 0;

    /**
     * Material Number Used by Customer
     */
    customerMaterialId: string = "";

    /**
     * Delivery schedule lines
     */
    schedule: SalesDocumentScheduleLine[] = [];

    /**
     * If item is a BOM, components
     */
    components: SalesDocumentItem[] = [];

    /**
     * Reason for rejection of quotations and sales orders
     */
    rejectionReason: string = "";

    /**
     * Product hierarchy
     */
    productHierarchy: string = "";

    /**
     * Repair Processing: Classification of Items
     */
    repairClassification: string = "";

    /**
     * Usage indicator
     */
    usageIndicator: string = "";

    agreement: {
        value: number;
        quantity: number;
        unit: string;

        /*
         *  Reconciliation Date for Agreed Cumulative Quantity
         */
        reconciliationDate: Date;
    } = {
        value: 0,
        quantity: 0,
        unit: "",
        reconciliationDate: new Date(0)
    }

    unit: {
        base: string;
        sales: string;
        target: string;
        conversion: {
            numerator: number;
            denominator: number;
        };

        /*
         * ID: Leading unit of measure for completing a transaction
         */
        leading: string;
    }
        = {
        base: "",
        sales: "",
        target: "",
        conversion: {
            numerator: 0,
            denominator: 0
        },
        leading: ""
    }

    /*
     *
     */
    parentItem: string = "";

    /*
     * Reference to the item for which it is an alternate
     */
    alternateFor: string = "";


    /*
     * Customer external reference
     */
    customerReference: {
        /*
         * Customer purchase order number
         */
        purchaseOrder: string;
        purchaseOrderItem: string;

        purchaseOrderSupplement: string;

        /*
         * Customer purchase order type
         */
        purchaseType: string;

        /*
         * Customer purchase order date
         */
        purchaseDate: Date;

        /*
         * Your reference
         */
        externalReference: string;

        /*
         * Orderer name
         */
        orderer: string;

        shipToPartyPurchaseOrder:string;

        shipToPartyPurchaseOrderItem:string;

        shipToPartyPurchaseType:string;

        shipToPartyPurchaseDate:Date;

        shipToPartyPurchaseReference:string;

        telephone:string;

    } = {
        purchaseOrder: "",
        purchaseOrderItem: "",
        purchaseOrderSupplement: "",
        purchaseType: "",
        purchaseDate: new Date(0),
        externalReference: "",
        orderer: "",
        shipToPartyPurchaseOrder: "",
        shipToPartyPurchaseOrderItem: "",
        shipToPartyPurchaseType: "",
        shipToPartyPurchaseDate: new Date(0),
        shipToPartyPurchaseReference: "",
        telephone: ""
    };

    /*
     * deliveryGroup
     */
    deliveryGroup: string = "";

    /*
     *
     */
    deliveryBlock: string = "";

    /*
     * Billing block for item
     */
    billingBlock: string = "";

    /*
     * Replacement part
     */
    replacementPart: string = "";

    /*
     * Method of billing for CO/PPC orders
     */
    billingMethod: string = "";

    /*
     * Division
     */
    division: string = "";

    /*
     * Business area
     */
    businessArea: string = "";

    value: {
        net: number;
        gross: number;
        cost: number;
        subtotals: number[];
        currency: string;
        exchangeRate: string;
        credit: number;
        creditPrice: number;
        statistical: number;
        tax: number;
    } = {
        net: 0,
        gross: 0,
        cost: 0,
        subtotals: [],
        currency: "",
        exchangeRate: "",
        credit: 0,
        creditPrice: 0,
        statistical: 0,
        tax: 0
    };

    delivery: {
        maximumPartialDeliveries: number;
        minimumDeliveryQuantity: number;
        partial: string;
        batchSplit: boolean;
        isFixedDate: boolean;
        priority: string;
        shippingProcessing: {
            fixedDays: number;
            variableDays: number;
        }
    }
        = {
        maximumPartialDeliveries: 0,
        minimumDeliveryQuantity: 0,
        partial: "",
        batchSplit: false,
        isFixedDate: false,
        priority: "",
        shippingProcessing: {
            fixedDays: 0,
            variableDays: 0
        }
    }

    reference: {
        productionOrder?: string;
        productionOrderItem?: string;
        salesDocument?: string;
        salesDocumentItem?: string;
        fullCopy: boolean;
        documentFlowUpdate: boolean;
        precedingFromReference: boolean;
    }
        = {
        productionOrder: "",
        productionOrderItem: "",
        salesDocument: "",
        salesDocumentItem: "",
        fullCopy: false,
        documentFlowUpdate: false,
        precedingFromReference: false
    }

    /*
     * Completion rule for quotation / contract
     */
    completionRule: string = "";

    /*
     * Plant
     */
    plant: string = "";


    /*
     * Storage location
     */
    storageLocation: string = "";

    /*
     * Shipping Point/Receiving Point
     */
    shippingPoint: string = "";

    /*
     * Route
     */
    route: string = "";


    billOfMaterial: {
        /*
         * Origin of the bill of material
         */
        origin: string;

        /*
         * Key date of the bill of material
         */
        date: Date;

        /*
         * Bill of material
         */
        material: string;

        /*
         * Bill of material item number VBAP not used
         */
        item: number;
    } = {
        origin: "",
        date: new Date(0),
        material: "",
        item: 0
    }

    /*
     * Order probability of the item
     */
    orderProbability: number = 0;


    tax: {
        materialClassification: string[];

        /*
         * Tax law: ICMS
         */
        icms: string;

        /*
         * Tax law: IPI
         */
        ipi: string;

        /*
         * SD tax code
         */
        code: string;
    }
        = {
        materialClassification: [],
        icms: "",
        ipi: "",
        code: ""
    }

    /*
     * Returns Item
     */
    isReturned: boolean = false;

    /*
     * Cash discount indicator
     */
    isCashDiscount: boolean = false;

    /*
     * Checking Group for Availability Check
     */
    availabilityCheckingGroup: string = "";


    /*
     * Summing up of requirements
     */
    requirementsSummingMethod: string = "";

    /*
     * Material Pricing Group
     */
    materialPricingGroup: string = "";

    /*
     * Account assignment group for this material
     */
    accountAssignmentGroup: string = "";

    /*
     * Volume rebate group
     */
    volumeRebateGroup: string = "";

    /*
     * Commission group
     */
    commissionGroup: string = "";

    /*
     * European Article Number (EAN) - obsolete!!!!!
     */
    ean: string = "";

    /*
     * Pricing is OK
     */
    isPricingCommited: boolean = false;

    /*
     * Valuation Type
     */
    valuationType: string = "";

    /*
     * Indicator: Separate valuation
     */
    isSplitValuated: boolean = false;

    /*
     * Batch management requirement indicator
     */
    isBatchRequired: boolean = false;

    /*
     * Batch management indicator (internal)
     */
    isBatchHandled: boolean = false;

    /*
     * International Article Number (EAN/UPC)
     */
    eanUpc: string = "";

    /*
     * Profit Center
     */
    profitCenter: string = "";

    /*
     * Material group 1-5
     */
    materialGroups: string[] = [];

    /*
     * Reason for material substitution
     */
    substitutionReason: string = "";

    /*
     * Special Stock Indicator
     */
    specialStock: string = "";

    /*
     * Allocation Indicator
     */
    allocation: string = "";

    /*
     * Profitability Segment Number (CO-PA)
     */
    profitSegment: string = "";

    /*
     * Work Breakdown Structure Element (WBS Element)
     */
    wbsElement: string = "";

    /*
     * Order Number
     */
    productionOrder: string = "";

    /*
     * Planning material
     */
    planningMaterial: string = "";

    /*
     * Planning plant
     */
    planningPlant: string = "";

    /*
     * Conversion factor: quantities
     */
    conversionFactor: number = 0;

    /*
     * Account Assignment Category
     */
    accountAssignmentCategory: string = "";

    /*
     * Consumption Posting
     */
    consumptionPosting: string = "";

    /*
     * BOM explosion number
     */
    bomExplosion: string = "";

    /*
     * Object number at item level
     */
    objectNumber: string = "";

    /*
     * Results Analysis Key
     */
    resultsAnalysisKey: string = "";

    /*
     * Requirements type
     */
    requirementType: string = "";

    /*
     * ID for partial release of order item, credit block
     */
    partialReleaseId: string = "";

    /*
     * ID: Item with active credit function / relevant for credit
     */
    activeCreditId: string = "";

    /*
     * Directly quoted exch. rate for credit data on req. dely date
     */
    directlyQuotedExchangeRate: number = 0;

    /*
     * Configuration
     */
    configuration: string = "";

    /*
     * Internal object number of the batch classification
     */
    batchClassificationObject: string = "";

    /*
     * Status expected price
     */
    priceStatus: string = "";

    /*
     * Condition update
     */
    conditionUpdate: boolean = false;

    /*
     * Serial Number Profile
     */
    serialNumberProfile: string = "";

    /*
     * Number of serial numbers
     */
    numberOfSerialNumbers: number = 0;

    /*
     * Customer has not posted goods receipt
     */
    noGoodsReceipt: boolean = false;

    /*
     * Material Group: Packaging Materials
     */
    packagingMaterial: string = "";

    /*
     * Status manual price change
     */
    manualPrice: string = "";

    /*
     * Document category of preceding SD document
     */
    precedingDocumentCategory: string = "";

    /*
     * ID for material determination
     */
    materialDetermination: string = "";

    /*
     * ID for higher-level item usage
     */
    itemUsage: string = "";

    /*
     * Cost Estimate Number for Cost Est. w/o Qty Structure
     */
    costEstimate: string = "";

    /*
     * Costing Variant
     */
    costingVariant: string = "";

    /*
     * BOM Item Number
     */
    bomItem: string = "";

    /*
     * Business Transaction Type for Foreign Trade
     */
    businessTransaction: string = "";

    /*
     * Preference indicator in export/import
     */
    preferenceIndicator: string = "";

    /*
     * Number of condition record from batch determination
     */
    batchDeterminationCondition: string = "";

    /*
     * Internal Class Number
     */
    internalClass: string = "";

    /*
     * Batches: Exit to quantity proposal
     */
    batchExit: number = 0;

    /*
     * BOM category
     */
    bomCategory: string = "";

    /*
     * BOM item node number
     */
    bomItemNode: string = "";

    /*
     * Internal counter
     */
    internalCounter: number = 0;

    /*
     * Inconsistent configuration
     */
    inconsistentConfiguration: boolean = false;

    /*
     * Overhead key
     */
    overheadKey: string = "";

    /*
     * Costing Sheet
     */
    costingSheet: string = "";

    /*
     * Product allocation determination procedure
     */
    productAllocationProcedure: string = "";

    /*
     * Pricing reference material of main item
     */
    pricingReferenceMaterial: string = "";

    /*
     * Material pricing group of main item
     */
    mainMaterialPricingGroup: string = "";

    /*
     * Material freight group
     */
    materialFreightGroup: string = "";

    /*
     * Planning delivery schedule instruction
     */
    planningDeliveryScheduleInstruction: string = "";

    /*
     * KANBAN/sequence number
     */
    sequenceNumber: string = "";

    /*
     * Form of payment guarantee
     */
    paymentGuaranteeFrom: string = "";

    /*
     * Guaranteed (factor between 0 and 1)
     */
    guaranteed: number = 0;

    /*
     * CFOP code and extension (old 5 char version)
     */
    cfop: string = "";

    valueContract: {
        id: string;
        item: string;
    } = {
        id: "",
        item: ""
    };

    /*
     * Assortment module
     */
    assortmentModule: string = "";

    /*
     * Valuation of Special Stock
     */
    specialStockValuation: string = "";

    materialGroupHierarchy: string[] = [];

    /*
     * Promotion
     */
    promotion: string = "";

    /*
     * Sales deal
     */
    salesDeal: string = "";

    /*
     * Free goods delivery control
     */
    freeGoodsDeliveryControl: string = "";

    /*
     * Parameter Variant/Standard Variant
     */
    validObject: string = "";

    /*
     * MRP Area
     */
    mrpArea: string = "";


    priceGroup: string = "";


    customerGroup:string = "";


    salesDistrict:string = "";

    priceList: string = "";

    incoterms: {
        code:string;
        place: string;
    } = {
        code: "",
        place: ""
    };

    orderCombination: string = "";

    invoiceCalendar: {
        dates: string;
        schedule:string;
    } = {
        dates: "",
        schedule:""
    };

    manualInvoice:boolean = false;

    additionalValueDays:number = 0;

    fixedValueDate:Date = new Date(0);

    paymentMethod:string = "";

    paymentTerms:string = "";

    customerAccountAssignmentGroup:string = "";

    pricingDate:Date = new Date(0);

    billingDate:Date = new Date(0);

    renderedServiceDate:Date = new Date(0);

    fiscalYear:number = 0;

    postingPeriod:number = 0;

    dunning: {
        key: string;
        block: string;
    } = {
        key:"",
        block:""
    }

    invoicePlan: string = "";

    paymentGuaranteeProcedure: string = "";

    internalFinancialDocument: string = "";

    departmentNumber: string = "";

    receivingPoint:string = "";

    customerConditionGroup:string[] = [];
}


export class SalesDocumentScheduleLine {

    documentId: string = "";

    itemId: string = "";

    scheduleId: string = "";
    deliveryBlock: string = "";
    scheduleType: string = "";
    requirementType: string = "";
    planningType: string = "";
    maintenanceRequest: string = "";
    purchaseOrderType: string = "";
    confirmationStatus: string = "";
    dateType: string = "";

    date: {
        requested: Date;
        delivery: Date;
        goodsIssue: Date;
        loading: Date;
        availability: Date;
        transportation: Date;
        procurementDeadline: Date;
        earliestReservation: Date;
        return: Date;
    }
        = {
        requested: new Date(0),
        delivery: new Date(0),
        goodsIssue: new Date(0),
        loading: new Date(0),
        availability: new Date(0),
        transportation: new Date(0),
        procurementDeadline: new Date(0),
        earliestReservation: new Date(0),
        return: new Date(0)
    };

    quantity: {
        requested: number;
        rounded: number;
        confirmed: number;
        salesUnit: string;
        commited: number;
    }
        = {
        requested: 0,
        rounded: 0,
        confirmed: 0,
        salesUnit: "",
        commited: 0
    }

    procurement: {
        purchaseRequisition: string;
        purchaseRequisitionItem: string;
    }
        = {
        purchaseRequisition: "",
        purchaseRequisitionItem: ""
    }

    relevancy: {
        delivery: boolean;
        invoiceReceipt: boolean;
    }
}
