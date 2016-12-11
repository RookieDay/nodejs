# 数据库

## 存储数据的方式

- 在内存中存储数据
- 在文件中存储数据

## 什么是数据库

## 数据库存储结构

### 数据库服务器

### 数据库

### 表

### 表中的记录

## SQL语言

- 数据定义语言（Data Definition  [ˌdefɪˈnɪʃn]  Language）简称DDL
- 数据操作语言（Data Manipulation [məˌnɪpjʊ'leɪʃn] Language）简称DML 
- 数据查询语言（Data Query Language）简称DQL

## 常见数据库产品

- oracle
- SqlServer
- DB2
- MySQL
- _MongoDB_

## 数据库基本操作

### 创建数据库

### 创建表

### 添加数据

- 使用GUI界面
- 使用SQL语句

```sql
INSERT INTO 表名(字段1,字段2,字段3...)
  VALUES(值1,值2,值3...)
```

### 更新数据

- 使用GUI界面
- 使用 SQL 语句

```sql
UPDATE 表名
  SET 字段1=值1,字段2=值2,字段3=值3...
  [WHERE 条件表达式]
```

### 删除数据

- 使用GUI界面
- 使用 SQL 语句

```sql
DELETE from 表名
    [WHERE 条件表达式];
```

### 查询数据

- 查询所有数据`SELECT * FROM 表名`
- 查询指定字段`SELECT 字段1,字段2,字段3... FROM 表名`
- 根据条件查询`SELECT * FROM 表名 WHERE 条件表达式`

## 使用 node 操作 MySQL 数据库

