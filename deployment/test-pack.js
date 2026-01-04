// test-app.js
const { createAgent, cr8 } = require("@artinet/sdk");
console.log("✓ SDK loaded");
const express = require("express");
console.log("✓ Express loaded");
const agent = cr8("TestAgent").text("ok").agent;
console.log("✓ Agent created");
cr8("TestAgent").text("ok").server.start(3000);
console.log("✓ Server started");
process.exit(0);
