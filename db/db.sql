-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 21, 2021 at 07:34 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toosz`
--

-- --------------------------------------------------------

--
-- Table structure for table `annuncements`
--

CREATE TABLE `annuncements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `org` varchar(60) NOT NULL,
  `title` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `contact` varchar(60) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `published` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `public` tinyint(1) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `description`, `public`, `slug`, `created`) VALUES
(1, 'Tudástár', 'Tudástár', 1, 'tudastar', '2021-03-03 09:12:31'),
(2, 'Tudásprogramok', 'Tudásprogramok', 0, 'tudasprogramok', '2021-03-03 09:12:31'),
(3, 'Partnerség', 'Partnerség', 0, 'partnerseg', '2021-03-03 09:13:24'),
(4, 'Jó gyakorlatok', 'Jó gyakorlatok', 0, 'jo-gyakorlatok', '2021-03-03 09:13:24'),
(5, 'Hálózatok', 'Hálózatok', 0, 'halozatok', '2021-03-03 09:13:24');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category_FK` bigint(20) UNSIGNED NOT NULL,
  `subcategory_FK` bigint(20) UNSIGNED NOT NULL,
  `author` varchar(255) NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `type` varchar(255) NOT NULL,
  `uri` varchar(255) NOT NULL,
  `contentType` varchar(255) NOT NULL DEFAULT 'url'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `slug` varchar(50) NOT NULL,
  `category_FK` bigint(20) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `title`, `description`, `icon`, `public`, `slug`, `category_FK`, `created`) VALUES
(1, 'D-Care', ' ', 'Gitcompare', 0, 'd-care', 5, '2021-03-21 12:36:43'),
(2, 'Erőszakmentes település', ' ', 'Heart', 0, 'eroszakmentes-telepules', 2, '2021-03-21 12:36:43'),
(3, 'Innováció', 'Akkor mivan ha keveset?', 'Bulb', 0, 'innovacio', 1, '2021-03-21 12:36:43'),
(4, 'Közszolgáltatás', 'Ide jön majd az alkategória leírása, remélhetőleg olyan 100, max 200 karakter.', 'Library', 0, 'kozszolgaltatas', 1, '2021-03-21 12:36:43'),
(5, 'Előadások', ' ', 'ChatboxEllipses', 0, 'eloadasok', 2, '2021-03-21 12:36:43'),
(6, 'Modern vezetői módszertanok', 'Mivan akkor ha sokat írok ide? Mivan akkor ha sokat írok ide?Mivan akkor ha sokat írok ide?Mivan akkor ha sokat írok ide?Mivan akkor ha sokat írok ide?', 'Flash', 0, 'modern-vezetoi-modszertanok', 1, '2021-03-21 12:36:43'),
(7, 'Nemzetközi gyakorlatok', ' ', 'Earth', 0, 'nemzetkozi-gyakorlatok', 4, '2021-03-21 12:36:43'),
(8, 'Smart City', ' ', 'Business', 0, 'smart-city', 1, '2021-03-21 12:36:43'),
(9, 'Önkormányzati jog', ' ', 'School', 0, 'onkormanyzati-jog', 1, '2021-03-21 12:36:43'),
(10, 'Tréningek', ' ', 'Accessibility', 0, 'treningek', 2, '2021-03-21 12:36:43'),
(11, 'Közbiztonság', 'Kiváló ikonválasztás kedves Balázs :D', 'Happy', 0, 'kozbiztonsag', 1, '2021-03-21 12:36:43'),
(12, 'Bűnmegelőzés', ' ', 'HandRight', 0, 'bunmegelozes', 1, '2021-03-21 12:36:43'),
(13, 'Önkormányzati kommunikáció', ' ', 'Megaphone', 0, 'onkormnazyati-kommunikacio', 1, '2021-03-21 12:36:43'),
(14, 'Körkörös gazdaság', '  ', 'Infinite', 0, 'korkoros-gazdasag', 1, '2021-03-21 12:36:43'),
(15, 'Generációk', ' ', 'People', 0, 'generaciok', 1, '2021-03-21 12:36:43'),
(16, 'Workshopok', ' ', 'Construct', 0, 'workshopok', 2, '2021-03-21 12:36:43'),
(17, 'Konferenciák', ' ', 'Book', 0, 'konferenciak', 2, '2021-03-21 12:36:43'),
(18, 'Közösségi tervezés', ' ', 'ColorWand', 0, 'kozossegi-tervezes', 1, '2021-03-21 12:36:43'),
(19, 'Hálózatkutatás', ' ', 'Search', 0, 'halozatkutatas', 1, '2021-03-21 12:36:43'),
(20, 'Idősügyi hálózat', ' ', 'Gitnetwork', 0, 'idosugyi-halozat', 5, '2021-03-21 12:36:43'),
(21, 'LÖGY', ' ', 'Home', 0, 'logy', 4, '2021-03-21 12:36:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(120) NOT NULL,
  `org` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `login` timestamp NOT NULL DEFAULT current_timestamp(),
  `reset` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `org`, `role`, `password`, `admin`, `created`, `updated`, `login`, `reset`, `name`, `approved`) VALUES
(1, 'czuforbence@gmail.com', '', '', '$2b$10$jw2sLYkGn8esseqKpgWAb.Rx0zQFHzEL1v2hMqTR0KKBe0Qe4vhyC', 1, '2021-03-21 13:27:56', '2021-03-21 13:27:56', '2021-03-21 13:27:56', '58d47f11-e95d-4771-9203-dd55611acfed', 'Czufor Bence', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `annuncements`
--
ALTER TABLE `annuncements`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `id_ann_title` (`title`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `index_unique_slug` (`slug`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `uri` (`uri`) USING BTREE,
  ADD KEY `category_FK` (`category_FK`),
  ADD KEY `subcategory_FK` (`subcategory_FK`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `index_slug_slug` (`slug`),
  ADD KEY `cat_foreign_key` (`category_FK`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `reset_token` (`reset`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `annuncements`
--
ALTER TABLE `annuncements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `category_FK` FOREIGN KEY (`category_FK`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subcategory_FK` FOREIGN KEY (`subcategory_FK`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `cat_foreign_key` FOREIGN KEY (`category_FK`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
