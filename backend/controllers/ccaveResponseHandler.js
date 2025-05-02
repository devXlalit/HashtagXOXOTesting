import http from "http";
import fs from "fs";
import ccav from "../utils/ccavutils.js";
import qs from "querystring";

export function postRes(request, response) {
  let ccavEncResponse = "";
  let ccavResponse = "";
  const workingKey = "4E9AC599E81383358DF08ED7F829E2EF"; // Replace with your actual working key
  let ccavPOST = "";

  request.on("data", (data) => {
    ccavEncResponse += data;
    ccavPOST = qs.parse(ccavEncResponse);
    const encryption = ccavPOST.encResp;
    ccavResponse = ccav.decrypt(encryption, workingKey);
  });

  request.on("end", () => {
    let pData = "<table border=1 cellspacing=2 cellpadding=2><tr><td>";
    pData += ccavResponse.replace(/=/gi, "</td><td>");
    pData = pData.replace(/&/gi, "</td></tr><tr><td>");
    pData += "</td></tr></table>";

    const htmlcode = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>${pData}</center><br></body></html>`;

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(htmlcode);
    response.end();
  });
}
