import express from "express";
import WebhookController from "./WebhookController";
const router = express.Router();
export default function WebhookRoute(app) {
  //orders
  router.get("/orders", WebhookController.getOrders);
  router.get("/orders-by-id", WebhookController.getOrderById);
  router.get("/orders-total", WebhookController.getOrderTotal);
  //customers
  router.get("/customers", WebhookController.getCustomers);
  router.get("/customer-by-id", WebhookController.getCustomerById);
  router.get("/customers-total", WebhookController.getTotalCustomers);
  //customers address
  router.get("/custommer-address", WebhookController.getCustomersAddress);
  router.get(
    "/customerid-addressid",
    WebhookController.getCustomersIdAddressId
  );
  //store
  router.get("/store", WebhookController.getStores);
  //products
  router.get("/products", WebhookController.getProducts);
  router.get("/product-by-id", WebhookController.getProductById);
  router.get("/products-total", WebhookController.getProductTotal);
  //collects
  router.get("/collects", WebhookController.getCollects);
  router.get("/collect-by-id", WebhookController.getCollectById);
  router.get("/collects-total", WebhookController.getCollectsTotal);
  //Custom collection
  router.get("/custom-collect", WebhookController.getCustomCollects);
  router.get("/custom-collect-by-id", WebhookController.getCustomCollectsId);
  router.get("/custom-collect-total", WebhookController.getCustomCollectsTotal);
  //Events
  router.get("/all-events", WebhookController.getEvents);
  router.get(
    "/events-custom-collects",
    WebhookController.getCustomCollectsEvents
  );
  router.get("/events-orders", WebhookController.getOrdersEvents);
  router.get("/events-products", WebhookController.getProductsEvents);
  router.get("/events-total", WebhookController.getEventsTotal);
  //Fulfillment
  router.get("/fulfillment", WebhookController.getFulfillment);
  router.get("/fulfillment-by-id", WebhookController.getFulfillmentById);
  router.get("/fulfillment-total", WebhookController.getFulfillmentTotal);
  //Metafields
  router.get("/metafields", WebhookController.getMetafields);
  router.get(
    "/metafields-custom-collect",
    WebhookController.getCustomCollectMetafields
  );
  router.get("/metafields-customers", WebhookController.getCustomersMetafields);
  router.get("/metafields-orders", WebhookController.getOrdersMetafields);
  router.get("/metafields-products", WebhookController.getProductsMetafields);
  router.get(
    "/metafields-products-by-id",
    WebhookController.getProductsByIdMetafields
  );
  router.get("/metafields-total", WebhookController.getMetafieldTotal);
  //price rule
  router.get("/price-rule", WebhookController.getPriceRule);
  router.get("/price-rule-by-id", WebhookController.getPriceRuleById);
  //Refunds
  router.get("/refund", WebhookController.getRefund);
  //Transaction
  router.get("/transaction", WebhookController.getTransaction);
  router.get("/transaction-by-id", WebhookController.getTransactionById);
  router.get("/transaction-total", WebhookController.getTransactionTotal);
  //Carrier Service
  router.get("/carrier-service", WebhookController.getCarrierServices);
  router.get(
    "/carrier-service-by-id",
    WebhookController.getCarrierServicesById
  );
  //Redirect
  router.get("/redirect", WebhookController.getRedirect);
  router.get("/redirect-by-id", WebhookController.getRedirectById);
  router.get("/redirect-total", WebhookController.getRedirectTotal);
  return app.use("/webhooks", router);
}
