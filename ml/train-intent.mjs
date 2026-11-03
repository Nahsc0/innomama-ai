import {writeFile} from 'node:fs/promises';
import {trainIntent} from './intent.js';
await writeFile('ml/intent-model.json',JSON.stringify(trainIntent(),null,2)+'\n');
console.log('Trained 8-intent naive Bayes data assistant.');
