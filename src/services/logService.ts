import { format } from 'date-fns';

export const logUserInput = async (input: string) => {
  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const logEntry = `[${timestamp}] User Input: ${input}\n`;

  // In a real application, you would send this to a server-side logging endpoint.
  // For client-side demonstration, we'll simulate writing to a local file.
  // This approach is NOT suitable for production logging as it won't persist
  // across sessions or be accessible for analysis.
  console.log('Simulating log to file:', logEntry);

  // To actually write to a file in a Node.js environment (not browser):
  // const fs = require('fs');
  // fs.appendFileSync('user_inputs.log', logEntry);
};

