# 🩺 MengZhiyi-Medical — Kidney & Vessel Segmentation Suite (nnU-Net + 3D Slicer)

> **目标一句话**  
> **打造一条“上传 → 自动分割 → 交互校正 → 三维模型/指标输出”的流水线，服务肾脏及血管（含 ADPKD）科研和临床评估。**

---

## 0 | 项目愿景

1. **算法核心**  
   - 使用 **nnU-Net 3d_fullres** 作为基线框架  
   - 预置 **Task08_KiTS19** 及 **ADPKD-kidney-segmentation** 两套权重  
   - 支持自定义再训练（增添血管标签 & 多期 follow-up 数据）

2. **用户体验**  
   - Web 端（Next 15 + React 18）完成 **DICOM / NIfTI 上传、任务选择、进度跟踪、结果预览**  
   - 一键将分割 mask 发送至 **3D Slicer**（MONAILabel / Segmentations MRML）进行交互细修  
   - 支持导出 **NIfTI / STL / FBX** 及关键体积指标（TKV、血管体积等）

3. **部署策略**  
   - **GPU Docker 容器** 独立负责推理；Next JS + Prisma API 网关；前后端鉴权使用 **next-auth**  
   - 首期部署在 **Google Cloud (GCE A100)**，后期可切换私有 GPU 节点/医院内网

---

## 1 | 技术栈

| 层级            | 方案                                    | 备注 |
|-----------------|-----------------------------------------|------|
| 前端            | Next.js 15 (React 18) + Tailwind CSS     | 页面：`/upload`, `/projects`, `/results/[id]` |
| 身份认证        | **next-auth** + JWT                     | 角色：`admin`, `researcher`, `viewer` |
| ORM/数据层      | Prisma Client + PostgreSQL              | 任务元数据、病例索引 |
| 推理容器        | nnU-Net (官方镜像) + 自建权重            | REST gRPC 二选一（默认 REST） |
| 数据标注协作    | 3D Slicer + MONAILabel                   | 主动学习循坏 |
| 云资源          | Google Cloud GCE A100 × 1               | Dev 默认 `n1-standard-8` |
| DevOps          | GitHub Actions + Docker Build x Deploy   | 主分支合并即触发 |
| AI 助手         | GitHub Copilot / Google Jules           | 代码补全与 PR Review |

---

## 2 | 目录结构
.
├─ app/                  # Next App Router 目录
│  └─ upload/
├─ prisma/               # Prisma schema & migrations
├─ nnunet/               # 推理/训练脚本 (Python 3.10)
│  ├─ weights/           # Task08_KiTS19, ADPKD 等
│  └─ docker/            # Dockerfile 推理镜像
├─ scripts/              # 数据准备、一键训练、评估
└─ README.md
---

## 3 | 快速上手

### 3.1 环境变量

```bash
# .env (Next.js)
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=...
ALLOWED_DEV_ORIGINS=http://localhost:3000,http://192.168.2.31:3000

3.2 本地开发
pnpm i              # 或 npm i --legacy-peer-deps
pnpm dev            # http://localhost:3000

# 推理容器 (需 NVIDIA GPU)
cd nnunet/docker
docker compose up   # 暴露 http://localhost:8000/predict

3.3 KiTS19 & ADPKD 权重下载
# KiTS19
mkdir -p nnunet/weights/Task08_Kits
wget -O kits.zip https://zenodo.org/record/4003545/files/nnUNet_trained_model_Task08_Kits.zip
unzip kits.zip -d nnunet/weights/Task08_Kits

# ADPKD
mkdir -p nnunet/weights/Task20_ADPKD
# 假设已获得 file.tar
docker load -i kidney_segmentation.tar

3.4 典型流程
	1.	上传 CT/MRI (DICOM/nii.gz) → 选择模型 → Create Job
	2.	后端写数据库记录，触发 REST 调用 /predict
	3.	推理容器返回 mask → 存储 minio / S3
	4.	前端轮询 / Socket 推送状态 → 用户可下载结果或 Open in 3D Slicer
	5.	在 Slicer 中修正、导出 STL / 指标 CSV

⸻

4 | Roadmap
	•	Next.js 页面骨架 + 文件上传
	•	nnU-Net 推理容器 (KiTS19)
	•	血管标签数据集整理 & 再训练
	•	MONAILabel 主动学习循环
	•	OAuth2 / JWT 单点登录
	•	GPU Multi-tenant 队列 / 优先级

5 | 常见问题
问题
解决方案
Cross-origin 警告
在 next.config.js 中设置 experimental.allowedDevOrigins（见顶部示例）
dataset.json 缺失
参见 scripts/fix_dataset.py 自动生成 / 从官网解压
依赖冲突 (react 18 vs @react-three/drei)
暂用 npm i --legacy-peer-deps; 后续升级至 React 19 时同步更新 drei

6 | 贡献指引
	1.	Fork & PR，确保 pnpm lint 通过
	2.	Python 代码遵循 black + isort，Node 遵循 eslint + prettier
	3.	新增模型/脚本请更新本 README.md 与 docs/CHANGELOG.md

⸻

致谢
	•	nnU-Net: Fabian Isensee 等
	•	KiTS19 & ADPKD Open-Source Teams
	•	3D Slicer / MONAILabel Community

Any questions? Open an issue or ping @ProjectMaintainer.
---

### 使用说明

- **AI 信息提示**：README 中已包含项目愿景与技术栈，Copilot/Jules 读到后能更好地“理解上下文”并生成合适代码。  
- **逐步补充**：当目录或流程有更新，补充对应段落，保持 AI 认知同步。  

祝项目开发顺利！