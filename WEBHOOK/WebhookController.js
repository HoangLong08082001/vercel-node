const { setTimeout, setInterval } = require("timers");
const request = require("request");
const axios = require("axios");
const WebSocket = require("ws");
const { response } = require("express");
const dotenv = require("dotenv");
dotenv.config();

//Orders
const getOrders = async (req, res) => {
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/orders.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let objuser = response.data.orders[1].user;
        let objitems = response.data.orders[1].line_items;
        let mergedObj = Object.assign({}, objuser, objitems);

        // console.log(mergedObj);
        // for (let i = 0; i < response.data.orders.length; i++) {
        //   console.log(
        //     Object.assign(
        //       {},
        //       response.data.orders[i].user,
        //       response.data.orders[i].line_items
        //     )
        //   );
        //   return res.send(
        //     Object.assign(
        //       {},
        //       response.data.orders[i].user,
        //       response.data.orders[i].line_items
        //     )
        //   );
        // }
        console.log(response.data);
        return res.status(200).json(response.data);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getOrderById = async (req, res) => {
  let id = 13526413;
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/orders/${id}.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let objuser = response.data.order.customer;
        let objitems = response.data.order.line_items;
        let mergedObj = Object.assign({}, objuser, objitems);
        console.log(mergedObj);
        return res.status(200).send(mergedObj);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getOrderTotal = async (req, res) => {
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/orders/count.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data.count;
        return res.status(200).json(response.data);
      });

    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Customers
const getCustomers = async (req, res) => {
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/customers.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data;
        console.log(total);
        return res.status(200).json(total);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCustomerById = async (req, res) => {
  let id = 15514861;
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/customers/${id}.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data;
        return res.status(200).json(total);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getTotalCustomers = async (req, res) => {
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/customers/count.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data.count;
        return res.status(200).json(response.data);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Customers address
const getCustomersAddress = async (req, res) => {
  let idCustommer = 15517780;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/customers/${idCustommer}/addresses.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
            password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCustomersIdAddressId = async (req, res) => {
  let idCustommer = 15517780;
  let idAddress = 26297325;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/customers/${idCustommer}/addresses/${idAddress}.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
            password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Stores
const getStores = async (req, res) => {
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/store.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data;
        console.log(total);
        return res.status(200).json(total);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Products
const getProducts = async (req, res) => {
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/products.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data;
        console.log(total);
        return res.status(200).json(total);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getProductById = async (req, res) => {
  let id = 35643157;
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/products/${id}.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data;
        return res.status(200).json(total);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getProductTotal = async (req, res) => {
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/products/count.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data.count;
        return res.status(200).json(response.data);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//collect
const getCollects = async (req, res) => {
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(`https://global-style.mysapo.net/admin/collects.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data;
        console.log(total);
        return res.status(200).json(total);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCollectById = async (req, res) => {
  let id = 35643157;
  try {
    // Thực hiện yêu cầu HTTP sử dụng axios
    await axios
      .get(
        `https://global-style.mysapo.net/admin/collects.json?product_id=${id}`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
            password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
          },
        }
      )
      .then((response) => {
        // Kiểm tra và xử lý dữ liệu
        // Xử lý dữ liệu 'billing_address' ở đây
        // setInterval(() => {
        //   console.log(response.data.orders[0].customer);
        // }, 1000);
        let total = response.data;
        return res.status(200).json(total);
      });
    // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCollectsTotal = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/collects/count.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        return res.send(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Custom collect
const getCustomCollects = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/custom_collections.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
      })
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCustomCollectsId = async (req, res) => {
  let idCustomCollect = 3390886;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/custom_collections/${idCustomCollect}.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
            password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCustomCollectsTotal = async (req, res) => {
  let product_id = 35643195;
  try {
    if (product_id) {
      await axios
        .get(
          `https://global-style.mysapo.net/admin/custom_collections/count.json?product_id=${product_id}`,
          {
            auth: {
              username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
              password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    }
    if (!product_id) {
      await axios
        .get(
          `https://global-style.mysapo.net/admin/custom_collections/count.json`,
          {
            auth: {
              username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
              password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
  return res.send("collect custom total");
};

//Events
const getEvents = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/events.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2", // API Key
          password: "235e3e74436d4a38bd7767f3e183fd50", // API Secret
        },
        headers: {
          Authorization: "b18ebd508aee4afdb910d9420326c63d",
        },
      })
      .then((response) => {
        console.log(response);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCustomCollectsEvents = async (req, res) => {
  let custom_collections_id = 3390886;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/custom_collections/${custom_collections_id}/events.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getOrdersEvents = async (req, res) => {
  let orders_id = 13529378;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/events.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getProductsEvents = async (req, res) => {
  let products_id = 35643195;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/products/${products_id}/events.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getEventsTotal = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/events/count.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2",
          password: "235e3e74436d4a38bd7767f3e183fd50",
        },
      })
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Fulfillment
const getFulfillment = async (req, res) => {
  let orders_id = 13529378;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/fulfillments.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getFulfillmentById = async (req, res) => {
  let orders_id = 13529378;
  let fulfillment_id = 11570149;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/fulfillments/${fulfillment_id}.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getFulfillmentTotal = async (req, res) => {
  let orders_id = 13529378;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/fulfillments/count.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Metafields
const getMetafields = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/metafields.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2",
          password: "235e3e74436d4a38bd7767f3e183fd50",
        },
      })
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCustomCollectMetafields = async (req, res) => {
  let custom_collection_id = 13529378;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/custom_collections/${custom_collection_id}/metafields.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCustomersMetafields = async (req, res) => {
  let customers_id = 15514861;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/customers/${customers_id}/metafields.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getOrdersMetafields = async (req, res) => {
  let orders_id = 13529378;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/metafields.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getProductsMetafields = async (req, res) => {
  let products_id = 35643195;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/products/${products_id}/metafields.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getMetafieldTotal = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/metafields/count.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2",
          password: "235e3e74436d4a38bd7767f3e183fd50",
        },
      })
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getProductsByIdMetafields = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/metafields/count.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2",
          password: "235e3e74436d4a38bd7767f3e183fd50",
        },
      })
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Price rule
const getPriceRule = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/price_rules.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2",
          password: "235e3e74436d4a38bd7767f3e183fd50",
        },
      })
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getPriceRuleById = async (req, res) => {
  let priceRule_id;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/price_rules/${priceRule_id}.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Refund
const getRefund = async (req, res) => {
  let orders_id = 13524208;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/refunds.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Transaction
const getTransaction = async (req, res) => {
  let orders_id = 13524208;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/transactions.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getTransactionById = async (req, res) => {
  let orders_id = 13524208;
  let transaction_id;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/transactions/${transaction_id}.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
  return res.send("transactions by id");
};
const getTransactionTotal = async (req, res) => {
  let orders_id = 13524208;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/orders/${orders_id}/transactions/count.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//Carrie Services
const getCarrierServices = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/carrier_services.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2",
          password: "235e3e74436d4a38bd7767f3e183fd50",
        },
      })
      .then((response) => {
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getCarrierServicesById = async (req, res) => {
  let carrier_services_id;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/carrier_services/${carrier_services_id}.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
  return res.send("carrier service");
};

//Redirect
const getRedirect = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/redirects.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2",
          password: "235e3e74436d4a38bd7767f3e183fd50",
        },
      })
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getRedirectById = async (req, res) => {
  let redirect_id;
  try {
    await axios
      .get(
        `https://global-style.mysapo.net/admin/redirects/${redirect_id}.json`,
        {
          auth: {
            username: "f65ea5edfe574e60b7f1745efa0659c2",
            password: "235e3e74436d4a38bd7767f3e183fd50",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
const getRedirectTotal = async (req, res) => {
  try {
    await axios
      .get(`https://global-style.mysapo.net/admin/redirects/count.json`, {
        auth: {
          username: "f65ea5edfe574e60b7f1745efa0659c2",
          password: "235e3e74436d4a38bd7767f3e183fd50",
        },
      })
      .then((response) => {
        console.log(response.data.count);
        return res.status(200).json(response.data);
      });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
module.exports = {
  getOrders,
  getOrderById,
  getOrderTotal,
  getCustomers,
  getCustomerById,
  getTotalCustomers,
  getStores,
  getProducts,
  getProductById,
  getProductTotal,
  getCollects,
  getCollectById,
  getCollectsTotal,
  getCustomersAddress,
  getCustomersIdAddressId,
  getCustomCollects,
  getCustomCollectsId,
  getCustomCollectsTotal,
  getEvents,
  getCustomCollectsEvents,
  getOrdersEvents,
  getProductsEvents,
  getFulfillment,
  getFulfillmentById,
  getFulfillmentTotal,
  getMetafields,
  getCustomCollectMetafields,
  getCustomersMetafields,
  getOrdersMetafields,
  getProductsMetafields,
  getPriceRule,
  getPriceRuleById,
  getRefund,
  getTransaction,
  getTransactionById,
  getTransactionTotal,
  getCarrierServices,
  getCarrierServicesById,
  getMetafieldTotal,
  getProductsByIdMetafields,
  getEventsTotal,
  getRedirect,
  getRedirectById,
  getRedirectTotal,
};
