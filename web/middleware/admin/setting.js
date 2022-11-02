import { Shopify } from "@shopify/shopify-api";
import Setting from "../../database/models/setting.js";

export default function applyAdminSettingMiddleware(app) {
  app.get("/api/admin/setting", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    let status = 200;
    let error = null;
    let payload = null;

    const shop = req.query.shop || session.shop;

    try {
      payload = await Setting.findOne({ shop });
    } catch (e) {
      console.log(
        `Failed to process api/admin/setting:
         ${e}`
      );
      status = 500;
      error = JSON.stringify(e, null, 2);
    }
    res.status(status).send({ success: status === 200, error, payload });
  });

  app.put("/api/admin/setting", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    let status = 200;
    let error = null;
    let payload = null;

    const shop = req.query?.shop || session?.shop;

    try {
      payload = await Setting.findOneAndUpdate({ shop }, req.body, {
        upsert: true,
        returnNewDocument: true,
      });
    } catch (e) {
      console.log(
        `Failed to process /api/admin/setting
         ${e}`
      );
      status = 500;
      error = JSON.stringify(e);
    }
    res.status(status).send({ success: status === 200, error, payload });
  });
}