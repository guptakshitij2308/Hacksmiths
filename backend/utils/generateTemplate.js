function generateTemplate(options) {
  const {
    title,
    message,

    logo,
    banner,
    headerColor = "#2563eb",
  } = options;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
          }
          .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          .email-header {
            padding: 20px;
            text-align: center;
            background-color: ${headerColor};
            color: white;
          }
          .email-header img {
            max-height: 40px;
            margin-bottom: 10px;
          }
          .email-body {
            padding: 24px;
          }
          .email-title {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          .email-message {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 24px;
          }
          .email-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: ${headerColor};
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          }
          .email-footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
            background-color: #fafafa;
          }
          .email-banner img {
            width: 100%;
            height: auto;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          ${banner ? `<div class="email-banner"><img src="${banner}" alt="Banner" /></div>` : ""}
          <div class="email-header">
            ${logo ? `<img src="${logo}" alt="Logo" />` : ""}
            <h1>${title}</h1>
          </div>
          <div class="email-body">
            <p class="email-message">${message}</p>
          </div>
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} SkillSwap. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = generateTemplate;
