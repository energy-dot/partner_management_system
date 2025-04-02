/**
 * このスクリプトは、すべてのモデルファイルに対して型定義の修正を適用します
 */
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname);
const modelFiles = fs.readdirSync(modelsDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');

// 各モデルファイルを処理
modelFiles.forEach(file => {
  const filePath = path.join(modelsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // DataTypesのインポートを修正
  content = content.replace(
    /import\s*{\s*DataTypes,/g, 
    'import { DataTypes as SequelizeDataTypes,'
  );
  
  // DataTypesの定数定義を追加（まだ存在しない場合）
  if (!content.includes('const DataTypes = SequelizeDataTypes')) {
    const importEndIndex = content.indexOf(';') + 1;
    const afterImports = content.substring(importEndIndex).trim();
    content = content.substring(0, importEndIndex) + '\n\n// DataTypesをインポートして値として使用できるようにする\nconst DataTypes = SequelizeDataTypes;\n\n' + afterImports;
  }
  
  // changedメソッドを追加（まだ存在しない場合）
  if (content.includes('beforeUpdate') && content.includes('changed(') && !content.includes('public changed(')) {
    const classEndIndex = content.lastIndexOf('}');
    const beforeClassEnd = content.substring(0, classEndIndex);
    const afterClassEnd = content.substring(classEndIndex);
    
    content = beforeClassEnd + `
  // TypeScriptエラー回避のためのメソッド
  public changed(field: string): boolean {
    return (this as any).dataValues[field] !== (this as any)._previousDataValues[field];
  }
` + afterClassEnd;
  }
  
  // 修正した内容を書き込み
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed model: ${file}`);
});

console.log('All model files have been fixed.');
