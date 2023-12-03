// snippet-start:[s3.JavaScript.cross-service.addDataV3.complete]
// snippet-start:[s3.JavaScript.cross-service.addDataV3.config]
// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../libs/snsClient.js";
import { dynamoClient } from "../libs/dynamoClient.js";

// snippet-end:[s3.JavaScript.cross-service.addDataV3.config]
// snippet-start:[s3.JavaScript.cross-service.addDataV3.function]
export const submitData = async () => {
  const id = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  //Set the table name.
  const tableName = "movies";

  //Set the parameters for the table
  const params = {
    TableName: tableName,
    Item: {
      id: { S: id + "" },
      title: { S: title + "" }
    },
  };
  // Check that all the fields are completed.
  if (id != "" && title != "") {
    try {
      //Upload the item to the table
      await dynamoClient.send(new PutItemCommand(params));
      alert("Data added to table.");
      try {
        // Create the message parameters object.
        const messageParams = {
          Message: "A new item with ID value was added to the DynamoDB",
          PhoneNumber: "PHONE_NUMBER", //PHONE_NUMBER, in the E.164 phone number structure.
          // For example, ak standard local formatted number, such as (415) 555-2671, is +14155552671 in E.164
          // format, where '1' in the country code.
        };
        // Send the SNS message
        const data = await snsClient.send(new PublishCommand(messageParams));
        console.log(
          "Success, message published. MessageID is " + data.MessageId,
        );
      } catch (err) {
        // Display error message if error is not sent
        console.error(err, err.stack);
      }
    } catch (err) {
      // Display error message if item is no added to table
      console.error(
        "An error occurred. Check the console for further information",
        err,
      );
    }
    // Display alert if all field are not completed.
  } else {
    alert("Enter data in each field.");
  }
};
// Expose the function to the browser
window.submitData = submitData;
// snippet-end:[s3.JavaScript.cross-service.addDataV3.function]
// snippet-end:[s3.JavaScript.cross-service.addDataV3.complete]