// ccavRequestHandler.js (ESM format)

import http from "http";
import fs from "fs";
import ccav from "../utils/ccavutils.js";
import querystring from "querystring";

const workingKey = "9E0758C80814F8AAEF07D9E334432B08"; // Put in the 32-Bit key shared by CCAvenues.
const accessCode = "AVMW25LJ61AW94WMWA"; // Put in the Access Code shared by CCAvenues.

export const postReq = (request, response) => {
  let body = "";
  let encRequest = "";
  let formbody = "";

  request.on("data", (data) => {
    body += data;
    encRequest = ccav.encrypt(body, workingKey);
    formbody = `
      <form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
        <input type="hidden" id="encRequest" name="encRequest" value="${encRequest}">
        <input type="hidden" name="access_code" id="access_code" value="${accessCode}">
        <script language="javascript">document.redirect.submit();</script>
      </form>
    `;
  });

  request.on("end", () => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(formbody);
    response.end();
  });
};
