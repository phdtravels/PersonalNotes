---
title: "Product Engineering Blueprint - phần 1"
description: "Khung phân tích, thiết kế, bảo mật, hiệu năng và vận hành sản phẩm phần mềm"
pubDate: 2026-11-19
category: tech
tags: [tech]
draft: false
---

# Product Engineering Blueprint

**Cẩm nang phân tích và phát triển sản phẩm phần mềm theo góc nhìn Product Management, Business Analysis, Architecture, Security, Performance và Production Operations**

> **Nguyên tắc trung tâm:** Xây dựng đúng sản phẩm (**build the right product**) và xây dựng sản phẩm đúng cách (**build the product right**). Một sản phẩm chất lượng phải giải quyết vấn đề thực tế, được đo lường bằng kết quả, an toàn khi vận hành và có thể thay đổi theo thời gian.

**Phiên bản:** 1.0 · **Cập nhật:** 19/11/2026 · **Đối tượng:** Product Manager, Business Analyst, Tech Lead, Solution Architect, QA, Security, DevOps, IT Manager và nhóm phát triển sản phẩm.

> **Phạm vi:** Tài liệu là framework thực hành, không phải chứng nhận tuân thủ. Các giá trị latency, availability, RPO/RTO và kiểm soát bảo mật trong ví dụ đều là **đề xuất minh họa**, cần điều chỉnh theo rủi ro, hợp đồng, hệ thống, ngân sách và kết quả kiểm thử.

---

## Mục lục

1. [Tư duy phát triển sản phẩm](#1-tư-duy-phát-triển-sản-phẩm)
2. [Tám chiều chất lượng của sản phẩm](#2-tám-chiều-chất-lượng-của-sản-phẩm)
3. [Product Discovery và Product Vision](#3-product-discovery-và-product-vision)
4. [Stakeholder Analysis](#4-stakeholder-analysis)
5. [Phân tích AS-IS và TO-BE](#5-phân-tích-as-is-và-to-be)
6. [Phân tích và đặc tả yêu cầu](#6-phân-tích-và-đặc-tả-yêu-cầu)
7. [Nhu cầu thật, ưu tiên và MVP](#7-nhu-cầu-thật-ưu-tiên-và-mvp)
8. [Data Governance và Source of Truth](#8-data-governance-và-source-of-truth)
9. [Thiết kế kiến trúc theo yêu cầu](#9-thiết-kế-kiến-trúc-theo-yêu-cầu)
10. [Security by Design và Threat Modeling](#10-security-by-design-và-threat-modeling)
11. [Performance và Capacity Engineering](#11-performance-và-capacity-engineering)
12. [Reliability, Availability và Disaster Recovery](#12-reliability-availability-và-disaster-recovery)
13. [Observability và Production Operations](#13-observability-và-production-operations)
14. [Quality Assurance và Testing Strategy](#14-quality-assurance-và-testing-strategy)
15. [Requirement Traceability và Definition of Done](#15-requirement-traceability-và-definition-of-done)
16. [Product Lifecycle và Quality Gates](#16-product-lifecycle-và-quality-gates)
17. [Bộ tài liệu dự án tối thiểu](#17-bộ-tài-liệu-dự-án-tối-thiểu)
18. [Evidence Matrix và phương pháp tổng hợp tài liệu](#18-evidence-matrix-và-phương-pháp-tổng-hợp-tài-liệu)
19. [Phân tích đầy đủ một tính năng](#19-phân-tích-đầy-đủ-một-tính-năng)
20. [Ví dụ: Login và hệ thống check-in](#20-ví-dụ-login-và-hệ-thống-check-in)
21. [Quản trị delivery, rủi ro và thay đổi](#21-quản-trị-delivery-rủi-ro-và-thay-đổi)
22. [Các lỗi điển hình cần tránh](#22-các-lỗi-điển-hình-cần-tránh)
23. [Mười hai nguyên tắc cốt lõi](#23-mười-hai-nguyên-tắc-cốt-lõi)
24. [Product Engineering Framework 10 bước](#24-product-engineering-framework-10-bước)
25. [Templates tái sử dụng](#25-templates-tái-sử-dụng)
26. [Checklist sẵn sàng đưa vào production](#26-checklist-sẵn-sàng-đưa-vào-production)
27. [Tiêu chuẩn và nguồn tham khảo](#27-tiêu-chuẩn-và-nguồn-tham-khảo)
28. [Hướng dẫn xuất bản trên GitHub Pages](#28-hướng-dẫn-xuất-bản-trên-github-pages)

---

## 1. Tư duy phát triển sản phẩm

Không nên bắt đầu một dự án bằng câu hỏi: *“Chúng ta cần những màn hình, bảng dữ liệu hay công nghệ gì?”* Hãy bắt đầu từ:

1. **Problem:** Ai gặp vấn đề gì? Mức độ ảnh hưởng?
2. **Outcome:** Kết quả kinh doanh nào cần đạt?
3. **People:** Ai sử dụng, ai phê duyệt, ai sở hữu dữ liệu, ai vận hành?
4. **Process:** Quy trình hiện tại ra sao? Điểm nghẽn nằm ở đâu?
5. **Requirements:** Cần chức năng, dữ liệu, tích hợp và chất lượng nào?
6. **Risk:** Điều gì có thể sai? Tác động ra sao?
7. **Design:** Kiến trúc và công nghệ nào phù hợp với ràng buộc?
8. **Validation:** Làm sao chứng minh hệ thống đáp ứng yêu cầu?
9. **Operations:** Phát hiện, ứng phó và khôi phục sự cố thế nào?
10. **Learning:** Sau khi phát hành, dữ liệu và phản hồi sẽ cải tiến sản phẩm ra sao?

```text
Problem → Business Value → Stakeholders → Process → Requirements
                                              ↓
Measure ← Operate ← Release ← Validate ← Architecture & Design
   └────────────────── Feedback / Discovery ──────────────────┘
```

**Ví dụ:** Thay vì yêu cầu “xây dựng hệ thống check-in bằng thẻ”, hãy xác định vấn đề gốc: thông tin hiện diện phân tán, xác thực chậm, khó audit, phụ thuộc kết nối và có rủi ro gian lận. Từ đó mới đề xuất credential, thiết bị đọc, dữ liệu sự kiện, phân quyền và dashboard.

### Hai câu hỏi phải luôn được phân biệt

- **Build the right product:** Sản phẩm có tạo giá trị cho đúng người dùng và tổ chức không?
- **Build the product right:** Sản phẩm có chính xác, an toàn, hiệu năng phù hợp, ổn định và dễ vận hành không?

Hai mục tiêu đều quan trọng; chức năng hoàn thành không đồng nghĩa giá trị đã được xác thực.

---

## 2. Tám chiều chất lượng của sản phẩm

Để đánh giá toàn diện, sử dụng 8 **góc nhìn quản trị** sau (đây là cách nhóm thực hành, **không phải** danh sách chính thức của ISO/IEC 25010):

| Góc nhìn | Câu hỏi quản trị | Bằng chứng cần có |
|---|---|---|
| Business value | Có giải quyết đúng vấn đề và KPI không? | Baseline, target, outcome dashboard |
| User experience | Người dùng có hoàn thành tác vụ hiệu quả không? | Journey, usability test, accessibility test |
| Functional correctness | Quy tắc nghiệp vụ và tình huống lỗi có đúng không? | Acceptance criteria, test cases |
| Security & privacy | Có kiểm soát truy cập, dữ liệu, lạm dụng và rủi ro không? | Threat model, security tests, privacy assessment |
| Performance & scalability | Có đáp ứng tải thực tế và tải tăng trưởng? | Load/stress tests, latency percentiles |
| Reliability & recovery | Sự cố xảy ra thì hệ thống có phục hồi? | SLOs, failover tests, restore drills |
| Operability | Có giám sát, cảnh báo, quy trình hỗ trợ và ứng cứu? | Dashboard, alert, runbook, incident records |
| Maintainability & evolution | Có thay đổi, tích hợp và nâng cấp an toàn? | Architecture, tests, ADR, code review |

**Lưu ý:** Không dùng tích số các điểm chất lượng làm công thức khoa học. Phép ví dụ “giá trị × bảo mật × hiệu năng” chỉ diễn tả trực giác rằng một điểm yếu nghiêm trọng có thể khiến sản phẩm thất bại dù các chiều khác tốt.

### Chất lượng là một hệ thống đánh đổi

- Mã hóa, audit và kiểm tra quyền làm phát sinh chi phí xử lý nhưng là kiểm soát cần thiết.
- Độ trễ thấp không đủ nếu dữ liệu sai hoặc nghiệp vụ bị mất tính nhất quán.
- Kiến trúc mở rộng tốt nhưng quá phức tạp có thể tăng chi phí và rủi ro vận hành.
- Hãy đưa các đánh đổi vào **Architecture Decision Record (ADR)** và phê duyệt theo mức rủi ro.

---

## 3. Product Discovery và Product Vision

### 3.1 Product problem statement

Một problem statement tốt có đủ:

- **Context:** hoàn cảnh, quy trình và các bên liên quan;
- **Pain:** vấn đề định lượng được;
- **Root cause:** giả thuyết về nguyên nhân, cần kiểm chứng;
- **Impact:** chi phí, rủi ro, thời gian, trải nghiệm;
- **Evidence:** phỏng vấn, log, thống kê, quan sát;
- **Opportunity:** lợi ích kỳ vọng nếu giải quyết.

**Mẫu:**

> [Nhóm người dùng] đang gặp [vấn đề] trong [bối cảnh], dẫn tới [tác động đo được]. Dữ liệu hiện có cho thấy [bằng chứng]. Chúng ta muốn cải thiện [chỉ số] từ [baseline] lên [target] trước [mốc thời gian].

### 3.2 Product Vision

> For **[target users]**, who **[problem]**, our product provides **[solution]** so that **[measurable outcome]**.

**Ví dụ Campus Platform:**

> For university administrators and students who depend on fragmented access systems, the Campus Platform provides centralized identity and secure credential verification so that access events can be reliably recorded and audited across campuses.

### 3.3 Product outcomes và KPIs

| Metric | Baseline | Target | Owner | Phương pháp đo |
|---|---:|---:|---|---|
| Thời gian duyệt yêu cầu | 3 ngày | ≤ 4 giờ | Business owner | Event timestamps |
| Tỷ lệ xử lý tự phục vụ | Chưa đo | Thiết lập sau pilot | Product owner | Analytics |
| Tỷ lệ tác vụ hoàn thành | Chưa đo | Thiết lập sau usability test | UX lead | Task analytics |
| Số sự cố nghiêm trọng | Chưa đo | Risk-based target | Operations | Incident management |

**Nguyên tắc:** Không đặt KPI giả có vẻ chính xác khi chưa có baseline và phương pháp đo đáng tin cậy.

### 3.4 Phương pháp discovery

Phỏng vấn người dùng, quan sát công việc, phân tích ticket, khảo sát, shadowing, workshop, prototype và kiểm chứng giả thuyết. Phân biệt rõ **facts**, **assumptions** và **decisions**.

---

## 4. Stakeholder Analysis

Không chỉ có end user. Xác định người sử dụng, quản lý, vận hành, bảo mật, chủ dữ liệu, compliance, nhà cung cấp tích hợp, lãnh đạo và người chịu ảnh hưởng.

| Stakeholder | Need | Pain point | Decision rights | Risk exposure |
|---|---|---|---|---|
| End user | Tác vụ nhanh, rõ ràng | Nhiều bước, nhập trùng | Góp ý/UAT | Trung bình |
| Business manager | Báo cáo, phê duyệt | Dữ liệu chậm | Business rules | Cao |
| IT operations | Ổn định, hỗ trợ tốt | Khó xác định lỗi | Vận hành | Cao |
| Security | Quyền, log, dữ liệu | Privilege abuse | Security review | Rất cao |
| Data owner | Đúng, đủ, nhất quán | Nhiều bản dữ liệu | Data policy | Cao |
| Management | Giá trị, chi phí, rủi ro | Không đo được ROI | Investment | Cao |

### Stakeholder deliverables

- Stakeholder map và ma trận **Power × Interest**;
- **RACI**: Responsible, Accountable, Consulted, Informed;
- Lịch phỏng vấn và bản ghi quyết định;
- Danh sách xung đột yêu cầu và cơ chế xử lý.

> **Lưu ý:** Một người có thể giữ nhiều vai trò; phải xác định **ai có quyền quyết định cuối cùng**, không chỉ ai tham gia họp.

---

## 5. Phân tích AS-IS và TO-BE

### 5.1 AS-IS: quan sát thay vì suy đoán

```text
Student → Submit form → Staff checks → Excel → Email approval
                                             ↓
                                         Update system
```

Với từng bước, thu thập: actor, input/output, business rule, thời gian chờ, tần suất, tỷ lệ lỗi, điều kiện ngoại lệ, rủi ro, hệ thống và dữ liệu liên quan.

Tìm các điểm nghẽn: duplicate entry, handoff, approval delay, manual reconciliation, data inconsistency, single point of failure, thiếu audit và thiếu quyền rõ ràng.

### 5.2 TO-BE: tối ưu quy trình trước khi tự động hóa

```text
User → Portal → Validate → Workflow → Approve → Core system
                         │                         │
                         └→ Audit + Notification ←─┘
```

**Câu hỏi then chốt:** Nếu chưa có phần mềm, quy trình tốt nhất nên hoạt động thế nào? Chỉ sau đó mới xem nên tự động hóa bước nào.

### 5.3 Các trường hợp thường bị bỏ qua

- Từ chối, hủy, hoàn tác, chuyển người duyệt, duyệt quá hạn;
- Gửi lặp yêu cầu, cùng lúc hai người chỉnh sửa;
- Mất mạng và khôi phục sau khi offline;
- Dữ liệu nguồn thay đổi giữa chừng;
- Tích hợp bên ngoài lỗi hoặc trả kết quả không đồng nhất.

**Deliverable:** Process maps, pain-point register, business rule catalog, TO-BE design và quantified improvement hypothesis.

---

## 6. Phân tích và đặc tả yêu cầu

### 6.1 Hệ phân cấp requirement

```text
Business Goal
  └─ Business Requirement (BR)
       └─ User Requirement / Use Case (UR/UC)
            ├─ Functional Requirement (FR)
            ├─ Data Requirement (DR)
            ├─ Integration Requirement (IR)
            └─ Non-Functional Requirement (NFR)
                 ├─ Security (SEC)
                 ├─ Performance (PERF)
                 ├─ Reliability (REL)
                 ├─ Operations (OPS)
                 └─ Accessibility (ACC)
```

**Ví dụ:**

| ID | Loại | Requirement |
|---|---|---|
| BR-001 | Business | Giảm thời gian xử lý hồ sơ từ 3 ngày xuống ≤ 4 giờ |
| UR-001 | User | Người quản lý duyệt hồ sơ trực tuyến |
| FR-021 | Function | Hỗ trợ Approve/Reject kèm lý do và trạng thái |
| SEC-011 | Security | Chỉ người có quyền tại đúng phạm vi hồ sơ mới được duyệt |
| AUD-004 | Audit | Ghi người thao tác, thời gian, đối tượng, hành động, kết quả và correlation ID |
| PERF-003 | Performance | P95 của API duyệt ≤ 500 ms tại profile tải đã xác định |
| REL-002 | Reliability | Gửi lại request không gây duyệt trùng |
| TC-102 | Test | User không có quyền phải nhận từ chối và không có side effect |

Các con số trên chỉ là **ví dụ về cách viết**, không phải SLO mặc định cho mọi dự án.

### 6.2 Requirement tốt phải có gì?

- **Unique ID**, nguồn yêu cầu, rationale, priority, owner;
- Mô tả rõ ràng, không mâu thuẫn, có thể kiểm chứng;
- Preconditions, triggers, happy path, alternate paths, exceptions;
- Business rules, data states, permissions, audit;
- Acceptance criteria (Given/When/Then);
- Dependencies, assumptions, out-of-scope, change history;
- Link tới test cases và business outcomes.

### 6.3 Functional và Non-Functional Requirements

| Nhóm NFR | Câu hỏi và đầu ra cần thiết |
|---|---|
| Performance | P50/P95/P99, throughput, dataset, load profile |
| Scalability | Peak, growth, saturation threshold |
| Availability | SLO, maintenance window, error budget |
| Reliability | Data loss, duplicate operations, consistency |
| Security | Threat model, identity, authorization, secure storage |
| Privacy | Data classification, consent/legal basis khi áp dụng, retention |
| Recoverability | RPO, RTO, restore tests |
| Maintainability | Modularity, testability, deployment rollback |
| Observability | Logs, traces, metrics, alerts, audit |
| Interoperability | API, schemas, backward compatibility |
| Accessibility | WCAG target, keyboard/screen reader checks |
| Data quality | Completeness, accuracy, freshness, provenance |

**Nguyên tắc:** “Hệ thống phải nhanh/an toàn/ổn định” không kiểm thử được. NFR cần nêu **điều kiện + metric + ngưỡng + phương pháp đo + owner**.

---

## 7. Nhu cầu thật, ưu tiên và MVP

### 7.1 Phân biệt request và need

User nói “cần Export Excel” có thể thực chất muốn “gửi báo cáo cho lãnh đạo hằng tuần”. Giải pháp có thể là dashboard, email report hoặc scheduled export. Trước khi triển khai, hỏi: *Tại sao? Dùng khi nào? Quyết định nào dựa vào kết quả?*

### 7.2 Prioritization

- **MoSCoW:** Must / Should / Could / Won't (trong phạm vi phiên bản hiện tại).
- **RICE:** `(Reach × Impact × Confidence) / Effort` — dùng nhất quán thang điểm.
- **Risk-based prioritization:** Kết hợp business value, user impact, risk reduction, regulatory deadline và cost.

Một công thức cộng/trừ trọng số nội bộ **chỉ là heuristic**, không phải tiêu chuẩn phổ quát. Không dùng điểm số để thay thế quyết định về kiểm soát bắt buộc.

### 7.3 MVP đúng nghĩa

MVP là sản phẩm nhỏ nhất để **kiểm chứng giả thuyết giá trị cốt lõi** với tiêu chuẩn an toàn phù hợp, không phải phiên bản thiếu bảo mật.

```text
Pilot/MVP: Core workflow + AuthN/AuthZ + Audit + Basic support
Phase 2  : Notifications + Advanced reporting + Automation
Phase 3  : Analytics + Optimization + AI (chỉ khi có use case rõ)
```

Những kiểm soát an toàn, data integrity và backup thiết yếu **không được hoãn** chỉ vì gọi là MVP.

---

## 8. Data Governance và Source of Truth

Data model không phải nhiệm vụ chỉ làm ở cuối. Phải xác định:

| Khía cạnh | Câu hỏi |
|---|---|
| Ownership | Ai chịu trách nhiệm định nghĩa và chất lượng? |
| Source of Truth | Hệ thống nào là nguồn dữ liệu chính thức? |
| Identity | Khóa định danh có unique, bất biến và liên kết được không? |
| Quality | Độ đầy đủ, đúng, trùng lặp, mới nhất? |
| Classification | Public, Internal, Confidential, Restricted? |
| Lifecycle | Tạo, cập nhật, lưu trữ, xóa, archive? |
| Retention | Lưu bao lâu, căn cứ chính sách/pháp luật nào? |
| Lineage | Dữ liệu đi qua những hệ thống và biến đổi nào? |
| Access | Ai được xem/sửa/xuất/chia sẻ? |
| Recovery | Khôi phục, đối soát và replay dữ liệu thế nào? |

**Ví dụ:** Student information do SIS/ERP quản lý, các hệ thống Library, LMS, Check-in lấy dữ liệu qua hợp đồng tích hợp rõ ràng. Hạn chế nhiều nơi cùng cập nhật một thuộc tính mà không có cơ chế ownership, đồng bộ và xử lý xung đột.

```text
             SIS / ERP (authoritative)
                      │
                Validated APIs / Events
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
      LMS           Library       Check-in
```

### Các quyết định cần chốt

- Transaction boundaries, consistency requirements, concurrency control;
- Soft delete versus hard delete;
- Data migration/validation và backfill;
- PII handling, encryption, tokenization/pseudonymization khi phù hợp;
- Data contracts, versioning và schema change;
- Audit trail khác với application debug logs.

---

## 9. Thiết kế kiến trúc theo yêu cầu

Không chọn microservices, event-driven hay cloud chỉ vì công nghệ đang phổ biến. Quyết định kiến trúc xuất phát từ:

- Tải hiện tại/đỉnh/tăng trưởng;
- Độ phức tạp domain và tích hợp;
- Ranh giới bảo mật, dữ liệu và fault isolation;
- Quy mô đội ngũ, kinh nghiệm vận hành;
- Tần suất release, uptime, RPO/RTO;
- Tổng chi phí sở hữu (TCO) và thời gian đưa ra thị trường.

| Phương án | Khi phù hợp | Trade-off |
|---|---|---|
| Modular Monolith | Domain vừa, đội nhỏ/vừa, transaction chặt | Cần kỷ luật boundary, deployment chung |
| Microservices | Bounded contexts rõ, đội độc lập, nhu cầu scale/release riêng | Distributed complexity, network, ops, consistency |
| Event-driven | Xử lý bất đồng bộ, tích hợp sự kiện | Ordering, duplicates, retries, eventual consistency |
| Serverless | Workload biến động, tác vụ ngắn, managed ops | Cold start, limits, portability/cost |
| Hybrid | Nhiều ràng buộc cũ và mới | Integration, security, observability phức tạp |

### 9.1 Reference architecture

```text
Web / Mobile / Devices
          │
       WAF / TLS
          │
    Gateway / API
          │
   Application layer
          │
     Domain model
          │
Infrastructure adapters ── External systems
          │
    Database / Cache / Queue
```

**Cross-cutting concerns:** identity, authorization, validation, error handling, secrets, configuration, rate limits, caching, logging, metrics, tracing, audit, retries, health checks và deployment automation.

### 9.2 ADR: Architecture Decision Record

Mỗi quyết định lớn phải có: context, drivers, alternatives, decision, rationale, consequences, status, owner và date. **“Chọn X vì team quen”** có thể là một yếu tố hợp lệ nhưng cần cân nhắc cùng scalability, security, maintainability và cost.

---

## 10. Security by Design và Threat Modeling

Bảo mật là một phần của requirement, design, code, test, release và operations — không phải bước pen-test cuối cùng.

```text
Assets → Trust boundaries → Threats → Risk assessment
    → Controls → Verification → Detection → Response
```

### 10.1 STRIDE

| Threat | Câu hỏi ví dụ | Kiểm soát gợi ý |
|---|---|---|
| Spoofing | Có thể giả mạo danh tính? | Strong authentication, MFA, credential protection |
| Tampering | Có thể sửa request hay dữ liệu? | Authorization, integrity checks, server-side validation |
| Repudiation | Người dùng có thể phủ nhận hành động? | Tamper-resistant audit trail, time synchronization |
| Information Disclosure | Lộ dữ liệu nhạy cảm qua API/log? | Least privilege, minimization, encryption |
| Denial of Service | Có thể làm cạn tài nguyên? | Rate limiting, quotas, capacity, abuse detection |
| Elevation of Privilege | Có thể vượt quyền/đổi role? | Resource-level authorization, segregation of duties |

### 10.2 Authentication ≠ Authorization

- **Authentication (AuthN):** xác định danh tính.
- **Authorization (AuthZ):** xác định hành động trên tài nguyên cụ thể, bao gồm phạm vi sở hữu/đơn vị.

```text
User → Identity → Role / Attribute / Policy → Resource → Action
```

Không chỉ kiểm tra `isLoggedIn`. Mọi API nhạy cảm phải có **server-side authorization**; kiểm tra UI chỉ hỗ trợ trải nghiệm. Có thể dùng RBAC, ABAC hoặc policy-based access tùy bài toán.

### 10.3 Least privilege

Mỗi người dùng, service account, database login và hệ thống tích hợp chỉ có quyền cần thiết. Không sử dụng tài khoản có toàn quyền như `sa` cho ứng dụng thông thường. Quản lý secret bằng secret store, hạn chế quyền và rotation theo đánh giá rủi ro.

### 10.4 Security baseline checklist

- [ ] Identity federation (OIDC/OAuth2/SAML khi phù hợp) và MFA cho tài khoản đặc quyền
- [ ] Server-side authorization ở từng endpoint, object và action
- [ ] Input validation, safe output encoding, chống injection/XSS/CSRF theo ngữ cảnh
- [ ] Password/session/token policies theo risk model; revocation và expiration
- [ ] TLS, encryption at rest khi cần, key lifecycle và secure secrets
- [ ] Dependency/SCA scanning, code scanning, SBOM nếu tổ chức yêu cầu
- [ ] Secure file upload: loại file, kích thước, AV/sandbox, cách ly lưu trữ
- [ ] Rate limiting, quota, abuse detection và audit cho privileged actions
- [ ] Log không chứa password, token, private key hoặc PII không cần thiết
- [ ] Security headers, CORS allowlist phù hợp, CSP khi áp dụng
- [ ] Backup protection, patching, incident response và access review
- [ ] Vulnerability management với owner, severity, remediation SLA

**Ghi chú:** Không có một con số timeout, ngưỡng lockout hay thuật toán AuthN duy nhất đúng cho mọi ứng dụng; thiết kế dựa vào threat model và tiêu chuẩn nội bộ.

### 10.5 Security references

Đối chiếu [OWASP ASVS 5.0](https://asvs.owasp.org/), [OWASP Top 10](https://owasp.org/www-project-top-ten/) và [NIST SSDF SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final). Khi có yêu cầu pháp lý, phải rà soát các quy định hiện hành theo quốc gia, ngành và loại dữ liệu.

---

## 11. Performance và Capacity Engineering

Tối ưu hiệu năng phải dựa trên **đo đạc bottleneck**. Không đồng nhất “code chạy nhanh” với “user trải nghiệm nhanh”.

```text
Client → DNS/Network → Gateway → API → Business logic
                                      │
                                      ├── Database
                                      ├── Cache
                                      └── External APIs
```

**End-to-end latency** phụ thuộc đường đi thực tế, bao gồm các bước nối tiếp và bước có thể chạy song song. Không cộng đơn giản mọi latency như một công thức luôn đúng.

### 11.1 Bộ metrics tối thiểu

| Nhóm | Metrics |
|---|---|
| User experience | Page load, Core Web Vitals (web), task completion time |
| API | Request rate, P50/P95/P99, error rate, saturation |
| Database | Query duration, waits, locks, deadlocks, pool usage |
| Infrastructure | CPU, RAM, IOPS, network, disk latency |
| Cache | Hit ratio, evictions, stale data |
| Queue | Depth, oldest message age, processing delay, DLQ |
| Capacity | Peak concurrent sessions, transactions/s, headroom |

**Ví dụ:** Average API = 300 ms nhưng P95 = 4.2 giây thì một nhóm đáng kể request vẫn chậm. Vì vậy cần quan sát phân phối độ trễ và lỗi, không chỉ average.

### 11.2 Performance requirement mẫu

> `PERF-001`: Với dataset 5 triệu hồ sơ, profile tải gồm 800 người dùng đồng thời theo kịch bản đã thống nhất, API tìm kiếm phải đạt **P95 ≤ 500 ms**, error rate **< 1%** trong bài kiểm thử kéo dài 60 phút; các phụ thuộc bên ngoài được mô phỏng hoặc công bố điều kiện rõ ràng.

**Lưu ý:** Số liệu trên mang tính minh họa. Concurrent users không tự suy ra request/s; cần định nghĩa hành vi, think time và workload mix.

### 11.3 Phương pháp thử nghiệm

1. **Baseline:** đo với dữ liệu, cấu hình và tải đại diện.
2. **Load test:** tải mục tiêu.
3. **Stress test:** vượt mục tiêu để tìm điểm gãy.
4. **Spike test:** biến động đột ngột.
5. **Soak test:** chạy dài để phát hiện memory leak, queue buildup.
6. **Capacity model:** dự báo tăng trưởng, xác định scaling trigger.
7. **Regression:** so sánh hiệu năng giữa các phiên bản.

Tối ưu dựa trên tracing, query plans, indexing, pagination, caching strategy và concurrency limits; không tối ưu mù quáng.

---

## 12. Reliability, Availability và Disaster Recovery

Hệ thống phải được thiết kế dựa trên giả định **mọi dependency đều có thể hỏng**: database, network, node, storage, DNS, identity provider hoặc external API.

### Các pattern quan trọng

- Timeout và bounded retry với backoff/jitter;
- Circuit breaker khi gọi hệ thống không ổn định;
- Idempotency key để hạn chế hiệu ứng ghi trùng;
- Queue, dead-letter queue và cơ chế replay;
- Graceful degradation/fallback khi phù hợp;
- Replication, failover, health checks;
- Backup, restore testing và DR exercises.

**Cảnh báo:** Retry với thao tác ghi không idempotent có thể tạo dữ liệu trùng. Replication/Availability Group **không thay thế backup**, vì lỗi logic hoặc xóa nhầm vẫn có thể lan sang replica.

### Các thuật ngữ bắt buộc hiểu đúng

| Thuật ngữ | Ý nghĩa |
|---|---|
| SLI | Chỉ số đo chất lượng dịch vụ thực tế |
| SLO | Mục tiêu nội bộ của SLI |
| SLA | Cam kết dịch vụ theo thỏa thuận |
| RPO | Lượng dữ liệu tối đa chấp nhận mất theo thời gian |
| RTO | Thời gian tối đa chấp nhận để khôi phục dịch vụ |
| Error budget | Phần mức lỗi/downtime cho phép theo SLO |

Ví dụ **mục tiêu minh họa**: availability 99.9%, RPO 15 phút, RTO 60 phút. Những giá trị này chỉ hợp lệ sau business impact analysis, sizing và diễn tập thực tế.

### DR readiness

- [ ] Xác định dependency và critical business services
- [ ] Backup schedule, encryption, retention, off-site/immutable copy nếu cần
- [ ] Theo dõi backup failures và backup freshness
- [ ] Diễn tập restore định kỳ; đo RPO/RTO thực tế
- [ ] Failover/failback runbook, quyền thực hiện và communication plan
- [ ] Test cả tình huống corruption, ransomware, mất site và lỗi con người

---

## 13. Observability và Production Operations

**Observability:** hệ thống cần cung cấp đủ dữ liệu để biết *cái gì đã hỏng, ở đâu, ảnh hưởng ai, từ lúc nào và vì sao*.

```text
             Production Service
               /      |      \
           Logs     Metrics   Traces
               \      |      /
             Dashboards & Alerts
                      │
               Incident Response
                      │
                Postmortem / Fix
```

### 13.1 Phân biệt telemetry và audit

- **Logs:** lỗi, sự kiện kỹ thuật, chẩn đoán;
- **Metrics:** thời gian, throughput, lỗi, saturation;
- **Traces:** quan hệ giữa các thành phần trong một request;
- **Audit:** ai thực hiện thao tác gì trên đối tượng nào, kết quả ra sao; có chính sách bảo toàn và retention riêng.

### 13.2 Tối thiểu mỗi service cần

- Health/readiness endpoints và dependency checks phù hợp;
- Structured logs với correlation/trace ID;
- Metrics RED (Rate, Errors, Duration) và USE (Utilization, Saturation, Errors) khi áp dụng;
- Alert actionable: owner, severity, threshold, escalation;
- Runbook, on-call ownership và incident timeline;
- Deploy version, change log và rollback procedure.

> **Câu hỏi kiểm tra:** Nếu sự cố xảy ra lúc 2 giờ sáng, người trực có biết nhận tín hiệu ở đâu, ai quyết định rollback, dữ liệu nào có thể mất và cách xác minh phục hồi không?

---

## 14. Quality Assurance và Testing Strategy

Không thể xác nhận một sản phẩm production-ready chỉ vì developer test thành công happy path.

| Tầng kiểm thử | Mục tiêu |
|---|---|
| Unit | Business rules và component logic |
| Integration | DB, queues, external adapters |
| Contract/API | Schema, status, backward compatibility |
| E2E/UI | Hành trình người dùng trọng yếu |
| Security | Access control, abuse cases, vulnerabilities |
| Performance | Latency, throughput, stability, capacity |
| Resilience | Failover, timeout, retry, corruption scenarios |
| Accessibility | Keyboard, contrast, screen reader, WCAG criteria |
| UAT | Business owner xác nhận workflow và outcomes |
| Production verification | Smoke test, canary metrics, rollback signals |

### 14.1 Test design

Dùng positive, negative, boundary, concurrency, state transition, role-permission matrix và failure injection. Dữ liệu test phải đại diện về số lượng, phân phối và độ phức tạp, đồng thời bảo vệ PII.

### 14.2 Test acceptance

- Có test case ID truy vết tới requirement;
- Có preconditions, steps, expected result, environment;
- Biết release-blocking defect là gì;
- Có báo cáo coverage phù hợp theo risk — không lầm tưởng 100% code coverage nghĩa là không có lỗi.

---

## 15. Requirement Traceability và Definition of Done

### 15.1 Traceability chain

```text
Business KPI → BR → UC/FR/NFR → Design → Implementation
                                       ↓
                                    Test Case
                                       ↓
                                 Production Metric
```

| Business goal | Requirement | Design/control | Test | Measure |
|---|---|---|---|---|
| Duyệt hồ sơ nhanh | FR-021 | Approval workflow | TC-021 | Time to approve |
| Chống duyệt trái quyền | SEC-011 | Resource policy | SEC-TC-011 | Unauthorized access attempts |
| Không duyệt lặp | REL-002 | Idempotency | REL-TC-002 | Duplicate side effects |

### 15.2 Definition of Ready (DoR)

Trước khi phát triển một story:

- [ ] Có actor, problem, outcome và acceptance criteria
- [ ] Hiểu business rules, data, permission, error flows
- [ ] NFR quan trọng được xác định
- [ ] Phụ thuộc, giả định và các câu hỏi chưa rõ được ghi nhận
- [ ] Đủ nhỏ để triển khai, kiểm thử, review

### 15.3 Definition of Done (DoD)

- [ ] Acceptance criteria pass
- [ ] Code review và automated tests pass
- [ ] Security checks/threat controls áp dụng xong
- [ ] Performance regression kiểm tra khi có rủi ro
- [ ] Logs, metrics, audit, alerts được bổ sung khi cần
- [ ] Documentation, migration và rollback cập nhật
- [ ] UAT/approval theo quy trình
- [ ] Không còn release-blocking defects chưa được chấp nhận rủi ro

---

## 16. Product Lifecycle và Quality Gates

```text
Discovery → Analysis → Design → Build → Test → Release
    ▲                                         │
    └──────── Learn ← Measure ← Operate ←─────┘
```

### Năm Quality Gates

| Gate | Câu hỏi quyết định | Evidence để thông qua |
|---|---|---|
| G1 — Business | Vấn đề và giá trị đã được xác thực? | Problem statement, personas, baseline, success metrics |
| G2 — Architecture | Thiết kế đáp ứng yêu cầu và ràng buộc? | ADRs, data/integration diagrams, NFR assessment |
| G3 — Security | Rủi ro được đánh giá và kiểm soát? | Threat model, access matrix, findings disposition |
| G4 — Quality | Chức năng/NFR được kiểm chứng? | QA results, load tests, UAT, release risk register |
| G5 — Production | Vận hành và phục hồi sẵn sàng? | Runbooks, dashboards, backup/restore, rollback, ownership |

Gate là **cơ chế quyết định và chấp nhận rủi ro**, không phải yêu cầu hồ sơ phức tạp. Mọi ngoại lệ cần người chịu trách nhiệm, lý do, thời hạn khắc phục và phê duyệt phù hợp.

---

## 17. Bộ tài liệu dự án tối thiểu

Tùy quy mô, có thể gộp nhiều tài liệu thành cùng một kho Markdown. Không tạo 20 tài liệu chỉ để đủ số lượng; ưu tiên tài liệu **sống**, có owner và được liên kết tới backlog/code/tests.

| # | Artifact | Nội dung |
|---:|---|---|
| 01 | Product Vision | Bài toán, mục tiêu, target users |
| 02 | Business Context | Hiện trạng, KPI, assumptions |
| 03 | Stakeholder Map | Roles, RACI, decision rights |
| 04 | AS-IS Process | Quy trình hiện tại, bottlenecks |
| 05 | TO-BE Process | Quy trình tương lai |
| 06 | Business Requirements | Business rules, outcomes |
| 07 | Functional Requirements | Use cases, states, exceptions |
| 08 | NFR Specification | Performance, security, SLOs, recovery |
| 09 | Data Model & Dictionary | Source of truth, entities, classification |
| 10 | Integration Map | APIs, events, contracts, dependencies |
| 11 | Architecture | Context/container/component/deployment diagrams |
| 12 | Security Architecture | Trust boundaries, controls, IAM |
| 13 | Threat Model | Threats, risks, mitigations |
| 14 | API Contracts | OpenAPI, errors, versioning |
| 15 | Test Strategy | Scope, levels, data, acceptance |
| 16 | Deployment Design | Environments, release, rollback |
| 17 | Monitoring Plan | SLIs, dashboards, alerts, ownership |
| 18 | Backup/DR Plan | RPO/RTO, restore, failover |
| 19 | Roadmap & Backlog | Priorities, milestones, dependencies |
| 20 | Decision Log / ADR | Decisions and consequences |

**Quy tắc quản trị:** Mỗi artifact phải có owner, last-reviewed date, status và đường dẫn tới evidence khi cần.

---

## 18. Evidence Matrix và phương pháp tổng hợp tài liệu

Đừng chỉ “đọc tài liệu rồi tóm tắt”. Hãy biến nguồn thông tin thành quyết định có kiểm chứng.

| Topic | Source | Finding | Confidence | Impact | Decision / Requirement |
|---|---|---|---|---|---|
| UX | User interview | Quy trình nhập trùng thông tin | Trung bình | Cao | TO-BE-004: autofill |
| Security | Threat modeling | Có nguy cơ IDOR/BOLA | Cao | Rất cao | SEC-011: object-level auth |
| Performance | APM logs | Query mất 4 giây tại peak | Cao | Cao | PERF-007: query review |
| Data | Data owner | SIS là nguồn chính thức | Cao | Cao | DR-003: one-way sync |
| Operations | Incident review | Chưa test restore | Cao | Rất cao | OPS-009: restore drill |

### Quy trình đọc và tổng hợp 7 bước

1. **Define question:** cần ra quyết định gì?
2. **Collect:** phỏng vấn, log, tài liệu chuẩn, source code, dashboard, policy.
3. **Classify:** fact / assumption / opinion / risk / decision.
4. **Verify:** đối chiếu độc lập, kiểm tra ngày, version, scope.
5. **Synthesize:** nhóm findings theo business, data, architecture, security, performance, operations.
6. **Convert:** biến findings thành requirements, controls, experiments, ADRs hoặc backlog items.
7. **Trace:** theo dõi bằng chứng → quyết định → triển khai → đo lường.

**Khi dùng AI để tổng hợp:** yêu cầu trích nguồn, phân biệt bằng chứng/giả định, ghi những gì chưa biết; không coi nội dung do AI tạo là bằng chứng độc lập. Không đưa secrets hay dữ liệu nhạy cảm vào công cụ chưa được phê duyệt.

---

## 19. Phân tích đầy đủ một tính năng

Dùng 12 câu hỏi như một review framework cho từng feature:

| # | Câu hỏi | Output |
|---:|---|---|
| 1 | **Why:** Vì sao cần? | Business outcome |
| 2 | **Who:** Ai dùng? | Actors/permissions |
| 3 | **Trigger:** Khi nào bắt đầu? | Preconditions/events |
| 4 | **Flow:** Happy path? | Main scenario |
| 5 | **Exception:** Khi nào thất bại? | Alternate/error paths |
| 6 | **Data:** Đọc/ghi gì? | Schema, data rules |
| 7 | **Permission:** Ai được làm trên đối tượng nào? | Access matrix |
| 8 | **Security:** Lạm dụng/attack vector nào? | Threats/controls |
| 9 | **Performance:** Nhanh/tải bao nhiêu? | Measurable NFR |
| 10 | **Audit:** Truy vết gì? | Audit event schema |
| 11 | **Monitoring:** Phát hiện lỗi thế nào? | Metrics/logs/alerts |
| 12 | **Success:** Thành công đo bằng gì? | KPI/acceptance |

Một feature tốt phải mô tả không chỉ hành động đúng, mà cả điều kiện **không được phép xảy ra**.

---

## 20. Ví dụ: Login và hệ thống check-in

### 20.1 Feature: Login

| Dimension | Phân tích |
|---|---|
| Actor | End user, privileged administrator |
| Identity | Enterprise IdP (ví dụ OIDC/AD integration) theo kiến trúc |
| Happy path | Chứng thực → nhận session/token → truy cập tài nguyên cho phép |
| Failure paths | Wrong credentials, locked/disabled account, IdP timeout |
| Security risks | Credential stuffing, brute force, session fixation, token leakage |
| Controls | MFA theo risk, rate limits, secure cookies/tokens, short-lived credentials |
| Audit | Success/failure với actor, time, source, result (không ghi secrets) |
| NFR | P95 mục tiêu và khả năng chịu lỗi IdP được định nghĩa theo workload |
| Metrics | Login success rate, errors, anomalous attempts |
| Tests | Wrong role, expired token, replay, disabled user, IdP unavailable |

**Nhắc lại:** Login thành công không có nghĩa người dùng được phép truy cập mọi tài nguyên. AuthZ phải thực thi độc lập ở backend.

### 20.2 Case study: Campus Check-in Platform

**Business problem:** nhiều cơ sở có dữ liệu hiện diện phân tán; cần xác thực, quản trị thiết bị, theo dõi và đối soát tập trung.

```text
Student SIS / ERP (source of truth)
            │ Sync/API
            ▼
      Central Campus Platform
      Identity · Credential · Check-in API
      Device management · Event ingestion · BI
             ▲                    ▲
      VPN/WAN + TLS          VPN/WAN + TLS
             │                    │
         Campus A              Campus B–E
         Edge gateway         Edge gateways
         Local queue          Local queues
          │      │                │
       Card    QR reader       Card / QR
```

**Các nhóm requirement quan trọng:**

- Credential lifecycle: cấp, khóa, gia hạn, mất thẻ;
- Device identity, remote management và revocation;
- Edge offline queue, retry, idempotency và đồng bộ thời gian;
- Event deduplication, traceability, reconciliation;
- Bảo vệ khóa, phân quyền riêng theo ứng dụng, không dùng chung khóa gốc bừa bãi;
- Access policy theo campus/zone/time;
- SLO check-in và thời gian đồng bộ sau khi có mạng;
- Backup, DR, monitoring và incident investigation.

**Failure experiments:** Mất WAN, đọc trùng thẻ, thiết bị mất đồng hồ chính xác, card revoked khi edge offline, backend chậm, queue đầy, replay sự kiện. Cần quy định hành vi chấp nhận được và test cho từng tình huống.

---

## 21. Quản trị delivery, rủi ro và thay đổi

Product Manager quản trị **giá trị và ưu tiên**, BA làm rõ **yêu cầu**, Engineering chịu trách nhiệm **giải pháp kỹ thuật**, Security/QA/Ops đưa ra **bằng chứng chất lượng**, còn business owner phê duyệt outcome và risk acceptance theo thẩm quyền.

### 21.1 Phân tách kế hoạch

- **Outcome roadmap:** mốc giá trị và giả thuyết cần chứng minh;
- **Delivery roadmap:** milestones, workstreams, dependencies;
- **Release plan:** thay đổi, migration, rollout, rollback;
- **Risk register:** risk, likelihood, impact, owner, response, status;
- **Decision register:** phương án, rationale, trade-offs, review date.

### 21.2 Change management

Khi nhận một yêu cầu mới, đánh giá: tác động tới scope, data, security, performance, integration, testing, operations và timeline. Không chấp nhận thay đổi chỉ bằng câu “thêm một nút thôi”.

### 21.3 Vận hành cải tiến

Sau release, theo dõi product KPIs, adoption, support tickets, defect trends, SLOs, security findings và chi phí. Dựa trên dữ liệu thực tế để cập nhật backlog; tổ chức blameless postmortem khi có incident.

---

## 22. Các lỗi điển hình cần tránh

- [ ] Bắt đầu từ tính năng hoặc công nghệ thay vì business problem
- [ ] Chỉ thiết kế happy path, bỏ qua lỗi và race conditions
- [ ] Không có owner và nguồn dữ liệu chính thức
- [ ] Chỉ có functional requirements, thiếu NFR đo được
- [ ] Hard-code permission ở UI hoặc chỉ kiểm tra đã login
- [ ] Thiết kế microservices trước khi có ranh giới domain rõ
- [ ] Tối ưu code khi chưa profiling database/external calls
- [ ] Dùng test data nhỏ khác xa production
- [ ] Bỏ qua privacy, retention và audit trail
- [ ] Không có correlation ID, dashboard hoặc cảnh báo có owner
- [ ] Có backup nhưng không test restore
- [ ] Replication được hiểu sai là backup
- [ ] Deploy không có rollback hoặc migration safety
- [ ] Không có traceability giữa mục tiêu và test cases
- [ ] Lấy số feature hoàn thành thay cho business outcome
- [ ] Dùng AI hoặc công cụ mới mà không có threat/data assessment

---

## 23. Mười hai nguyên tắc cốt lõi

1. **Problem before solution:** hiểu bài toán trước khi xây giải pháp.
2. **Outcome before feature:** đo giá trị, không chỉ đếm chức năng.
3. **Process before automation:** cải tiến quy trình trước khi số hóa.
4. **Need before request:** tìm nhu cầu thật phía sau đề xuất.
5. **NFR is a requirement:** chất lượng phải đo và kiểm thử được.
6. **Architecture follows requirements:** kiến trúc phục vụ ràng buộc.
7. **Security by design:** bảo mật xuyên suốt vòng đời sản phẩm.
8. **Data has ownership:** mỗi dữ liệu có chủ sở hữu và nguồn chính thức.
9. **Everything fails eventually:** thiết kế cho retry, resilience và recovery.
10. **Observe what matters:** hoạt động quan trọng phải đo và truy vết được.
11. **Make acceptance measurable:** tiêu chí thành công phải kiểm chứng được.
12. **Trace feature to value:** mọi khoản đầu tư tính năng có rationale và outcome.

> **Tư duy nền tảng:** `Problem → Value → People → Process → Requirements → Risk → Architecture → Technology → Evidence → Operations`.

---

## 24. Product Engineering Framework 10 bước

| Bước | Câu hỏi | Kết quả bàn giao |
|---|---|---|
| **1. WHY** | Vấn đề và kết quả cần đạt? | Vision, business case, KPIs |
| **2. WHO** | Ai dùng, ai quyết định, ai vận hành? | Stakeholders, personas, RACI |
| **3. WHAT** | Cần quy trình, chức năng và dữ liệu nào? | AS-IS/TO-BE, BR/FR/DR/IR |
| **4. QUALITY** | Mức chất lượng nào là đủ? | NFR, SLIs/SLOs, acceptance |
| **5. HOW** | Thiết kế gì phù hợp? | Architecture, ADR, API, data model |
| **6. RISK** | Những tình huống nào có thể thất bại? | Threat model, risk register |
| **7. VALIDATE** | Làm sao chứng minh hệ thống đúng? | Test results, UAT, load/security tests |
| **8. PRODUCE** | Triển khai và hỗ trợ ra sao? | Release, rollback, runbooks, DR |
| **9. MEASURE** | Sản phẩm hoạt động thực tế thế nào? | Product and technical dashboards |
| **10. IMPROVE** | Bài học và ưu tiên tiếp theo? | Backlog, experiments, updated roadmap |

**Cách áp dụng:** Mỗi bước có *owner, artifact, acceptance condition và decision*. Quy mô tài liệu tùy độ phức tạp, không bắt buộc chuyển thành waterfall; các bước được lặp lại sau mỗi vòng discovery/delivery.

---

## 25. Templates tái sử dụng

Các mẫu dưới đây có thể sao chép vào issue tracker, wiki hoặc tách thành file Markdown riêng.

### 25.1 Product Brief

```yaml
product_name: ""
problem_statement: ""
target_users: []
current_baseline: ""
desired_outcome: ""
success_metrics: []
in_scope: []
out_of_scope: []
constraints: []
assumptions_to_validate: []
risks: []
product_owner: ""
review_date: ""
```

### 25.2 User story / Feature specification

```markdown
## FEAT-001: [Tên tính năng]
**Business goal:** ...
**Actor(s):** ...
**As a** [role], **I want** [capability], **so that** [outcome].

### Preconditions
...
### Main flow
1. ...
### Alternate / Error flows
1. ...
### Data / Business rules
...
### Access control / Threats
...
### NFR / Audit / Monitoring
...
### Acceptance criteria
- Given ..., When ..., Then ...
### Dependencies / Open questions
...
### Traceability
BR-..., SEC-..., TC-...
```

### 25.3 NFR Specification

```markdown
| ID | Quality attribute | Context/workload | Metric |
|---|---|---|---|
| PERF-001 | API response | [load profile] | P95 ≤ [value] |
| REL-001 | Availability | [business hours] | SLO ≥ [value] |
| DR-001 | Recovery | [incident class] | RPO/RTO: [...] |
| SEC-001 | Authorization | [resource/action] | 100% negative tests pass |

Measurement method: ...
Environment: ...
Owner: ...
Exception process: ...
```

### 25.4 Risk Register

```markdown
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| R-001 | ... | ... | ... | ... | ... | Open |
```

### 25.5 Architecture Decision Record (ADR)

```markdown
# ADR-001: [Tên quyết định]
Status: Proposed / Accepted / Superseded
Date: YYYY-MM-DD
Owner: ...

## Context
...
## Drivers / Constraints
...
## Considered options
1. ...
2. ...
## Decision
...
## Rationale
...
## Consequences / Risks
...
## Review trigger
...
```

### 25.6 Threat Model mini-template

```markdown
Asset / Data classification: ...
Entry points: ...
Trust boundaries: ...
Threat (STRIDE): ...
Attack scenario: ...
Likelihood / Impact: ...
Mitigations: ...
Residual risk: ...
Verification test: ...
Owner / Decision: ...
```

### 25.7 Release Checklist

```markdown
Release: vX.Y.Z
Change owner: ...
Change window: ...
Migration plan: ...
Rollback plan: ...
Monitoring dashboard: ...
Known risks: ...
Go/No-Go approvers: ...
Post-release verification: ...
```

---

## 26. Checklist sẵn sàng đưa vào production

### Business & Product

- [ ] Problem statement, vision và success metrics có owner
- [ ] Stakeholder map và business approval được ghi lại
- [ ] AS-IS/TO-BE và critical user journeys được xác nhận
- [ ] Scope/MVP, out-of-scope và assumptions rõ ràng

### Requirements & Architecture

- [ ] FR/NFR đo được và traceable tới test
- [ ] Data ownership, classification và data contracts rõ ràng
- [ ] Architecture được review; ADRs lưu trữ
- [ ] API errors, versioning, backward compatibility và migration được xem xét

### Security & Privacy

- [ ] Threat model và security review hoàn thành
- [ ] AuthN/AuthZ thực thi ở backend, object-level controls được test
- [ ] Secrets, keys, encryption và logging theo policy
- [ ] Security scanning, findings triage và vulnerability exceptions được phê duyệt
- [ ] Privacy/retention/compliance requirements được đánh giá

### Performance & Reliability

- [ ] Load/stress/soak tests theo realistic workload
- [ ] P95/P99, error rate, saturation và capacity headroom đạt mục tiêu
- [ ] Timeout/retry/idempotency được test cho critical flows
- [ ] Backup hoàn thành và restore được diễn tập
- [ ] RPO/RTO, failover/failback được chứng minh hoặc ghi nhận gap

### Delivery & Operations

- [ ] Automated build/test/deploy và release approvals sẵn sàng
- [ ] Database migration an toàn, rollback khả thi
- [ ] Dashboards, alerts, runbook, escalation owner có sẵn
- [ ] UAT và smoke tests đạt acceptance criteria
- [ ] Go/No-Go decision ghi rõ owner, residual risks và thời điểm review

---

## 27. Tiêu chuẩn và nguồn tham khảo

Các nguồn dưới đây hỗ trợ việc thiết kế quality model và kiểm soát thực hành. **Đây là tài liệu tham khảo, không đồng nghĩa sản phẩm tự động tuân thủ tiêu chuẩn chỉ vì đã đọc hoặc dùng checklist.**

| Chủ đề | Nguồn chính thức | Cách sử dụng |
|---|---|---|
| Product quality | [ISO/IEC 25010:2023](https://www.iso.org/standard/78176.html) | Xây mô hình thuộc tính chất lượng |
| Application security | [OWASP ASVS 5.0](https://asvs.owasp.org/) | Chuyển bảo mật thành yêu cầu kiểm chứng |
| Common web security risks | [OWASP Top 10](https://owasp.org/www-project-top-ten/) | Nhận diện nhóm rủi ro phổ biến |
| Secure SDLC | [NIST SSDF — SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final) | Thực hành phát triển phần mềm an toàn |
| Accessibility | [WCAG 2.2 (W3C)](https://www.w3.org/TR/WCAG22/) | Xây acceptance criteria cho accessibility |
| Telemetry | [OpenTelemetry Documentation](https://opentelemetry.io/docs/) | Instrumentation cho logs, metrics và traces |
| Web performance | [web.dev — Core Web Vitals](https://web.dev/articles/vitals) | Đo trải nghiệm hiệu năng web |
| SRE principles | [Google SRE Books](https://sre.google/books/) | SLOs, monitoring, reliability practices |
| API design | [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) | Chuẩn hóa hợp đồng API |
| GitHub publishing | [GitHub Pages Documentation](https://docs.github.com/en/pages) | Xuất bản repository/documentation |

**Thời điểm đối chiếu:** 19/11/2026. Khi áp dụng vào dự án, kiểm tra lại version tài liệu, điều khoản sử dụng và phạm vi áp dụng cụ thể. ISO/IEC 25010 có bản quyền; tài liệu này không sao chép nội dung tiêu chuẩn.

---

## 28. Hướng dẫn xuất bản trên GitHub Pages

Đặt file này tại thư mục gốc repository với tên **`index.md`**. Đây là phương án đơn giản nhất để Jekyll/GitHub Pages tạo một trang nội dung.

1. Tạo một repository mới, ví dụ `product-engineering-blueprint`.
2. Upload file `index.md` vào nhánh mặc định (thường là `main`).
3. Mở **Settings → Pages**.
4. Chọn **Build and deployment → Deploy from a branch**.
5. Chọn nhánh `main` và thư mục `/ (root)`, rồi lưu.
6. Sau khi workflow triển khai thành công, mở URL GitHub Pages được hiển thị trong Settings → Pages.

Nếu dùng **project repository**, URL thông thường theo dạng `https://<username>.github.io/<repository>/`. Nếu dùng **user site** đặt tên repository `<username>.github.io`, URL thường là `https://<username>.github.io/`.

### Gợi ý nâng cấp sau khi publish

- Chọn Jekyll theme tương thích để dễ đọc trên điện thoại;
- Tách từng chương thành file Markdown riêng nếu tài liệu tiếp tục dài;
- Bổ sung repository `README.md` làm trang giới thiệu trên GitHub;
- Thêm issue templates cho feature/NFR/ADR;
- Dùng GitHub Actions và link checker để kiểm tra tài liệu.

> **Lưu ý:** Menu và cấu hình Pages có thể thay đổi theo loại tài khoản, quyền repository và chính sách tổ chức. Xem tài liệu GitHub Pages chính thức ở phần tham khảo.

---

## Kết luận

Một sản phẩm phần mềm đạt chất lượng production không được đánh giá chỉ bằng việc **“chạy được chức năng”**. Sản phẩm cần đồng thời chứng minh:

**Đúng vấn đề → Đúng quy trình → Đúng yêu cầu → Dữ liệu đáng tin → Bảo mật theo rủi ro → Hiệu năng đo được → Có khả năng phục hồi → Có thể vận hành → Có thể tiến hóa.**

> **Product Engineering không phải tập hợp tài liệu, mà là một cơ chế ra quyết định dựa trên bằng chứng, kết nối mục tiêu kinh doanh với thiết kế, phát triển, kiểm chứng và vận hành.**

---

*Có thể sử dụng và điều chỉnh tài liệu như một blueprint nội bộ cho dự án phần mềm mới. Nếu công bố công khai, cần kiểm tra chính sách sở hữu trí tuệ, thông tin nội bộ và quyền sử dụng ví dụ/dữ liệu trước khi phát hành.*

