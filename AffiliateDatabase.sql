-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th5 21, 2024 lúc 03:30 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `AffiliateDatabase`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `campaign`
--

CREATE TABLE `campaign` (
  `id_campaign` int(11) NOT NULL,
  `id_collaborator` int(11) DEFAULT NULL,
  `id_orders` int(11) DEFAULT NULL,
  `name_campaign` varchar(255) DEFAULT NULL,
  `personal_tax` varchar(255) DEFAULT NULL,
  `affiliate_tax` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `date_create` date DEFAULT NULL,
  `time_create` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `campaign_products`
--

CREATE TABLE `campaign_products` (
  `id_campaign_products` int(11) NOT NULL,
  `id_campaign` int(11) DEFAULT NULL,
  `id_products` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `collaborator`
--

CREATE TABLE `collaborator` (
  `id_collaborator` int(11) NOT NULL,
  `id_payment` int(11) DEFAULT NULL,
  `name_collaborator` varchar(255) DEFAULT NULL,
  `password_collaborator` varchar(255) DEFAULT NULL,
  `email_collaborator` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `address_collaborator` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `presenter_phone` varchar(255) DEFAULT NULL,
  `status_collaborator` int(11) DEFAULT NULL,
  `avatar` blob DEFAULT NULL,
  `code_verify` varchar(255) DEFAULT NULL,
  `date_create` date DEFAULT NULL,
  `time_create` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `collaborator`
--

INSERT INTO `collaborator` (`id_collaborator`, `id_payment`, `name_collaborator`, `password_collaborator`, `email_collaborator`, `gender`, `address_collaborator`, `phone`, `presenter_phone`, `status_collaborator`, `avatar`, `code_verify`, `date_create`, `time_create`) VALUES
(2, NULL, 'Long', '$2b$10$Xhlw.Mx/lDj/mosPKwOgm.DMjw2fQTXg7y6gOUWtgXCKMPXYKZjwG', 'long123', 1, '123', '0909000999', '0909788877', 1, NULL, NULL, NULL, '2024-05-20 14:03:23'),
(3, NULL, 'ha', '$2b$10$KDRXQW8bqrOMg68ma1oclOGh70dODgt9hlhVfVYyKjch0d.CKoSkW', 'ha123', 1, '321', '90999', '90909', 1, NULL, NULL, NULL, '2024-05-20 14:14:33'),
(4, NULL, 'Thien', '$2b$10$BOwVjVSNu/0tNkGOt6vEjeILxYXjUjUYNdsoq0TMQBvTtZ8LnatXm', 'thien123', 1, '99', '0909', '0908', 1, NULL, NULL, NULL, '2024-05-20 14:17:37'),
(5, NULL, 'khoa Dang', '$2b$10$KsV4KCad9xCOXyRN3OP8geScMAFNBwIF.aHncSx9o4TthTJ./9o2G', 'khoa123', 1, '0909', '9090123123', '0908221112', 1, NULL, NULL, NULL, '2024-05-20 14:31:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `collaborator_campaign`
--

CREATE TABLE `collaborator_campaign` (
  `id_collaborator_campaign` int(11) NOT NULL,
  `id_collaborator` int(11) DEFAULT NULL,
  `id_campaign` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `department`
--

CREATE TABLE `department` (
  `id_department` int(11) NOT NULL,
  `name_department` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `department_rule`
--

CREATE TABLE `department_rule` (
  `id_department_rule` int(11) NOT NULL,
  `id_department` int(11) DEFAULT NULL,
  `id_rule` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employee`
--

CREATE TABLE `employee` (
  `id_employee` int(11) NOT NULL,
  `id_department` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `code_verify` varchar(255) DEFAULT NULL,
  `date_create` date DEFAULT NULL,
  `time_create` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id_orders` int(11) NOT NULL,
  `id_orders_sapo` varchar(255) DEFAULT NULL,
  `financial_status` varchar(255) DEFAULT NULL,
  `fulfillment_status` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `referral_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id_orders`, `id_orders_sapo`, `financial_status`, `fulfillment_status`, `status`, `referral_link`) VALUES
(92, '13595582', 'paid', 'fulfilled', 'open', '/?bwaf=14805'),
(93, '13582888', 'pending', NULL, 'open', '/?bwaf=11111'),
(94, '13581704', 'paid', 'fulfilled', 'open', NULL),
(95, '13581524', 'paid', 'fulfilled', 'open', NULL),
(96, '13581158', 'paid', 'fulfilled', 'open', '/?bwaf=14805'),
(97, '13580877', 'paid', 'fulfilled', 'open', '/?bwaf=14805@54321'),
(98, '13580854', 'paid', 'fulfilled', 'open', '/?bwaf=11111'),
(99, '13580838', 'pending', NULL, 'open', '/?bwaf=11111'),
(100, '13580777', 'pending', NULL, 'open', '/?bwaf=14805'),
(101, '13576637', 'pending', NULL, 'open', '/favicon.ico'),
(102, '13570676', 'paid', 'fulfilled', 'open', NULL),
(103, '13562791', 'paid', 'fulfilled', 'open', NULL),
(104, '13562785', 'paid', NULL, 'open', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment`
--

CREATE TABLE `payment` (
  `id_payment` int(11) NOT NULL,
  `total_recived` decimal(10,0) DEFAULT NULL,
  `total_withdrawn` decimal(10,0) DEFAULT NULL,
  `id_collaborator` int(11) DEFAULT NULL,
  `date_payment` date DEFAULT NULL,
  `time_payment` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `payment`
--

INSERT INTO `payment` (`id_payment`, `total_recived`, `total_withdrawn`, `id_collaborator`, `date_payment`, `time_payment`) VALUES
(1, 0, 0, NULL, NULL, '2024-05-20 14:03:23'),
(2, 0, 0, 4, NULL, '2024-05-20 14:17:37'),
(3, 0, 0, 5, NULL, '2024-05-20 14:31:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id_products` int(11) NOT NULL,
  `id_products_sapo` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id_products`, `id_products_sapo`, `price`) VALUES
(1, 'SKU1', '100000'),
(2, 'SKU2', '120000'),
(3, 'SKU3', '80000'),
(4, 'SKU4', '150000'),
(5, 'SKU5', '120000'),
(6, 'SKU6', '90000'),
(7, 'SKU7', '0'),
(8, 'SKU8', '200000'),
(9, 'SKU9', '0'),
(10, 'SKU10', '200000'),
(11, 'SKU11', '0'),
(12, 'SKU12', '230000'),
(13, 'SKU13', '220000'),
(14, 'SKU14', '150000'),
(15, 'SKU15', '0'),
(16, 'SKU16', '80000'),
(17, 'SKU17', '230000'),
(18, 'SKU18', '99000'),
(19, 'SKU19', '80000'),
(20, 'SKU20', '65000'),
(21, 'SKU21', '55000'),
(22, 'SKU22', '75000'),
(23, 'SKU23', '95000'),
(24, 'SKU24-1', '55000'),
(25, 'SKU24-2', '155000'),
(26, 'SKU24-3', '355000'),
(27, 'SKU25', '80000'),
(28, 'SKU26', '150000'),
(29, 'SKU27-1', '110000'),
(30, 'SKU27-2', '120000'),
(31, 'SKU27-3', '100000'),
(32, 'SKU28', '150000'),
(33, 'SKU29', '200000'),
(34, 'SKU30', '150000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rule`
--

CREATE TABLE `rule` (
  `id_rule` int(11) NOT NULL,
  `rule` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Team`
--

CREATE TABLE `Team` (
  `id_team` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `link_team` varchar(255) DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `date_create` date DEFAULT NULL,
  `time_create` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `team_campaign`
--

CREATE TABLE `team_campaign` (
  `id_team_campaign` int(11) NOT NULL,
  `id_team` int(11) DEFAULT NULL,
  `id_campaign` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `team_collaborator`
--

CREATE TABLE `team_collaborator` (
  `id_team_collaborator` int(11) NOT NULL,
  `id_team` int(11) DEFAULT NULL,
  `id_collaborator` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `campaign`
--
ALTER TABLE `campaign`
  ADD PRIMARY KEY (`id_campaign`),
  ADD KEY `id_collaborator` (`id_collaborator`),
  ADD KEY `id_orders` (`id_orders`);

--
-- Chỉ mục cho bảng `campaign_products`
--
ALTER TABLE `campaign_products`
  ADD PRIMARY KEY (`id_campaign_products`),
  ADD KEY `id_campaign` (`id_campaign`),
  ADD KEY `id_products` (`id_products`);

--
-- Chỉ mục cho bảng `collaborator`
--
ALTER TABLE `collaborator`
  ADD PRIMARY KEY (`id_collaborator`),
  ADD KEY `id_payment` (`id_payment`);

--
-- Chỉ mục cho bảng `collaborator_campaign`
--
ALTER TABLE `collaborator_campaign`
  ADD PRIMARY KEY (`id_collaborator_campaign`),
  ADD KEY `id_campaign` (`id_campaign`),
  ADD KEY `id_collaborator` (`id_collaborator`);

--
-- Chỉ mục cho bảng `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id_department`);

--
-- Chỉ mục cho bảng `department_rule`
--
ALTER TABLE `department_rule`
  ADD PRIMARY KEY (`id_department_rule`),
  ADD KEY `id_rule` (`id_rule`),
  ADD KEY `id_department` (`id_department`);

--
-- Chỉ mục cho bảng `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id_employee`),
  ADD KEY `id_department` (`id_department`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_orders`),
  ADD UNIQUE KEY `id_orders_sapo` (`id_orders_sapo`);

--
-- Chỉ mục cho bảng `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id_payment`),
  ADD KEY `id_collaborator` (`id_collaborator`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_products`),
  ADD UNIQUE KEY `id_products_sapo` (`id_products_sapo`);

--
-- Chỉ mục cho bảng `rule`
--
ALTER TABLE `rule`
  ADD PRIMARY KEY (`id_rule`);

--
-- Chỉ mục cho bảng `Team`
--
ALTER TABLE `Team`
  ADD PRIMARY KEY (`id_team`);

--
-- Chỉ mục cho bảng `team_campaign`
--
ALTER TABLE `team_campaign`
  ADD PRIMARY KEY (`id_team_campaign`),
  ADD KEY `id_campaign` (`id_campaign`),
  ADD KEY `id_team` (`id_team`);

--
-- Chỉ mục cho bảng `team_collaborator`
--
ALTER TABLE `team_collaborator`
  ADD PRIMARY KEY (`id_team_collaborator`),
  ADD KEY `id_collaborator` (`id_collaborator`),
  ADD KEY `id_team` (`id_team`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `campaign`
--
ALTER TABLE `campaign`
  MODIFY `id_campaign` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `campaign_products`
--
ALTER TABLE `campaign_products`
  MODIFY `id_campaign_products` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `collaborator`
--
ALTER TABLE `collaborator`
  MODIFY `id_collaborator` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `collaborator_campaign`
--
ALTER TABLE `collaborator_campaign`
  MODIFY `id_collaborator_campaign` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `department`
--
ALTER TABLE `department`
  MODIFY `id_department` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `department_rule`
--
ALTER TABLE `department_rule`
  MODIFY `id_department_rule` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `employee`
--
ALTER TABLE `employee`
  MODIFY `id_employee` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id_orders` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT cho bảng `payment`
--
ALTER TABLE `payment`
  MODIFY `id_payment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id_products` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT cho bảng `rule`
--
ALTER TABLE `rule`
  MODIFY `id_rule` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Team`
--
ALTER TABLE `Team`
  MODIFY `id_team` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `team_campaign`
--
ALTER TABLE `team_campaign`
  MODIFY `id_team_campaign` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `team_collaborator`
--
ALTER TABLE `team_collaborator`
  MODIFY `id_team_collaborator` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `campaign`
--
ALTER TABLE `campaign`
  ADD CONSTRAINT `campaign_ibfk_1` FOREIGN KEY (`id_collaborator`) REFERENCES `collaborator` (`id_collaborator`),
  ADD CONSTRAINT `campaign_ibfk_2` FOREIGN KEY (`id_orders`) REFERENCES `orders` (`id_orders`);

--
-- Các ràng buộc cho bảng `campaign_products`
--
ALTER TABLE `campaign_products`
  ADD CONSTRAINT `campaign_products_ibfk_1` FOREIGN KEY (`id_campaign`) REFERENCES `campaign` (`id_campaign`),
  ADD CONSTRAINT `campaign_products_ibfk_2` FOREIGN KEY (`id_products`) REFERENCES `products` (`id_products`);

--
-- Các ràng buộc cho bảng `collaborator`
--
ALTER TABLE `collaborator`
  ADD CONSTRAINT `collaborator_ibfk_1` FOREIGN KEY (`id_payment`) REFERENCES `payment` (`id_payment`);

--
-- Các ràng buộc cho bảng `collaborator_campaign`
--
ALTER TABLE `collaborator_campaign`
  ADD CONSTRAINT `collaborator_campaign_ibfk_1` FOREIGN KEY (`id_campaign`) REFERENCES `campaign` (`id_campaign`),
  ADD CONSTRAINT `collaborator_campaign_ibfk_2` FOREIGN KEY (`id_collaborator`) REFERENCES `collaborator` (`id_collaborator`);

--
-- Các ràng buộc cho bảng `department_rule`
--
ALTER TABLE `department_rule`
  ADD CONSTRAINT `department_rule_ibfk_1` FOREIGN KEY (`id_rule`) REFERENCES `rule` (`id_rule`),
  ADD CONSTRAINT `department_rule_ibfk_2` FOREIGN KEY (`id_department`) REFERENCES `department` (`id_department`);

--
-- Các ràng buộc cho bảng `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`id_department`) REFERENCES `department` (`id_department`);

--
-- Các ràng buộc cho bảng `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`id_collaborator`) REFERENCES `collaborator` (`id_collaborator`);

--
-- Các ràng buộc cho bảng `team_campaign`
--
ALTER TABLE `team_campaign`
  ADD CONSTRAINT `team_campaign_ibfk_1` FOREIGN KEY (`id_campaign`) REFERENCES `campaign` (`id_campaign`),
  ADD CONSTRAINT `team_campaign_ibfk_2` FOREIGN KEY (`id_team`) REFERENCES `Team` (`id_team`);

--
-- Các ràng buộc cho bảng `team_collaborator`
--
ALTER TABLE `team_collaborator`
  ADD CONSTRAINT `team_collaborator_ibfk_1` FOREIGN KEY (`id_collaborator`) REFERENCES `collaborator` (`id_collaborator`),
  ADD CONSTRAINT `team_collaborator_ibfk_2` FOREIGN KEY (`id_team`) REFERENCES `Team` (`id_team`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
