## 标签模块数据库设计


### 字段设计



**id**         主键  init

**name**       名称  string

**docArr**     所属文档id数组  string[]

**num**        文章数量 init

**open**       是否启用 / 禁用  1 -> 启用  0 ->  禁用   init

**hot**        是否是热搜标签   0 -> 否  1 ->  是  init

**createAt**   创建时间 date 

**updateAt**   更新时间 date