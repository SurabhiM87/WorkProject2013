-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 23, 2013 at 06:49 PM
-- Server version: 5.5.29
-- PHP Version: 5.4.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Edgar`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE `Customer` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address1` varchar(500) NOT NULL,
  `address2` varchar(500) DEFAULT NULL,
  `phone1` int(100) NOT NULL,
  `phone2` varchar(100) DEFAULT NULL,
  `fax` varchar(100) DEFAULT NULL,
  `userCountTotal` smallint(6) NOT NULL DEFAULT '0',
  `isDeleted` binary(1) NOT NULL,
  `userCountActive` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `customerId_3` (`id`,`isDeleted`),
  KEY `customerId_4` (`id`),
  KEY `customerName` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=104 ;

--
-- Dumping data for table `Customer`
--

INSERT INTO `Customer` (`id`, `name`, `address1`, `address2`, `phone1`, `phone2`, `fax`, `userCountTotal`, `isDeleted`, `userCountActive`) VALUES
(100, 'Goldman Sachs', 'Newport, Jersey', '', 2147483647, '657566576', '69854906', 0, '0', 0),
(101, 'Walmart.Inc', 'Westbury, PorthWashington', '', 2147483647, '2147483647', '2147483647', 0, '0', 0),
(102, 'Moody National Reit', 'NewYork', '', 2147483647, '2147483647', '2147483647', 0, '0', 0),
(103, 'Desai & Desai Associates', 'Spring Hill Village', '', 2147483647, '2147483647', '2147483647', 0, '0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `File`
--

CREATE TABLE `File` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `projectId` int(100) NOT NULL,
  `filePath` varchar(200) NOT NULL,
  `fileName` varchar(100) NOT NULL,
  `extension` varchar(100) NOT NULL,
  `modifiedOn` datetime NOT NULL,
  `version` varchar(100) NOT NULL,
  `state` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `File`
--

INSERT INTO `File` (`id`, `projectId`, `filePath`, `fileName`, `extension`, `modifiedOn`, `version`, `state`) VALUES
(9, 58, 'Walmart.Inc/2010/13F-HR@A/Form 13F-HR@A_2013-12-30/admp-s1a_112213_1.1.htm', 'admp-s1a_112213_1.1.htm', 'htm', '2013-12-23 12:07:31', '1.1', 'edit'),
(13, 58, 'Walmart.Inc/2010/13F-HR@A/Form 13F-HR@A_2013-12-30/admp-s1a_112213_1.2.htm', 'admp-s1a_112213_1.2.htm', 'htm', '2013-12-23 12:48:32', '1.2', 'edit');

-- --------------------------------------------------------

--
-- Table structure for table `FileProject`
--

CREATE TABLE `FileProject` (
  `fileId` int(100) NOT NULL,
  `projectId` int(100) NOT NULL,
  KEY `fk_FileProject` (`fileId`),
  KEY `fk_ProjectFile` (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `FormTemplates`
--

CREATE TABLE `FormTemplates` (
  `FormTemplate_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(100) NOT NULL,
  `AnchorTag` varchar(100) NOT NULL,
  `SectionNumber` varchar(100) DEFAULT NULL,
  `ItemNumber` varchar(100) NOT NULL,
  PRIMARY KEY (`FormTemplate_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=610 ;

--
-- Dumping data for table `FormTemplates`
--

INSERT INTO `FormTemplates` (`FormTemplate_ID`, `Type`, `AnchorTag`, `SectionNumber`, `ItemNumber`) VALUES
(1, '1', '10-K', 'Cover', ''),
(2, '2', '10-K', 'INDEX', ''),
(3, '3', '10-K', 'PIItem1', 'PART I'),
(4, '4', '10-K', 'PIItem1A', 'PART I'),
(5, '5', '10-K', 'PIItem1B', 'PART I'),
(6, '6', '10-K', 'PIItem2', 'PART I'),
(7, '7', '10-K', 'PIItem3', 'PART I'),
(8, '8', '10-K', 'PIItem4', 'PART I'),
(9, '9', '10-K', 'PIIItem5', 'PART II'),
(10, '10', '10-K', 'PIIItem6', 'PART II'),
(11, '11', '10-K', 'PIIItem7', 'PART II'),
(12, '12', '10-K', 'PIIItem7A', 'PART II'),
(13, '13', '10-K', 'PIIItem8', 'PART II'),
(14, '14', '10-K', 'PIIItem9', 'PART II'),
(15, '15', '10-K', 'PIIItem9A', 'PART II'),
(16, '16', '10-K', 'PIIItem9A(T)', 'PART II'),
(17, '17', '10-K', 'PIIIItem9B', 'PART II'),
(18, '18', '10-K', 'PIIIItem10', 'PART III'),
(19, '19', '10-K', 'PIIIItem11', 'PART III'),
(20, '20', '10-K', 'PIIIItem12', 'PART III'),
(21, '21', '10-K', 'PIIIItem13', 'PART III'),
(22, '22', '10-K', 'PIIIItem14', 'PART III'),
(23, '23', '10-K', 'PIVItem15', 'PART IV'),
(24, '24', '10-K', 'Signature', ''),
(25, '25', '10-K', 'Exhibit_Index', ''),
(26, '26', '10-K', 'Opinion', 'PART II'),
(27, '27', '10-K', 'Controls', 'PART II'),
(28, '28', '10-K', 'BalanceSheet', 'PART II'),
(29, '29', '10-K', 'IncomeStatement', 'PART II'),
(30, '30', '10-K', 'ComprehensiveIncome', 'PART II'),
(31, '31', '10-K', 'EquityStatement', 'PART II'),
(32, '32', '10-K', 'CashFlows', 'PART II'),
(33, '33', '10-K', 'Note1', 'PART II'),
(34, '34', '10-K', 'Note2', 'PART II'),
(35, '35', '10-K', 'Note3', 'PART II'),
(36, '36', '10-K', 'Note4', 'PART II'),
(37, '37', '10-K', 'Note5', 'PART II'),
(38, '38', '10-K', 'Note6', 'PART II'),
(39, '39', '10-K', 'Note7', 'PART II'),
(40, '40', '10-K', 'Note8', 'PART II'),
(41, '41', '10-K', 'Note9', 'PART II'),
(42, '42', '10-K', 'Note10', 'PART II'),
(43, '43', '10-K', 'Note11', 'PART II'),
(44, '44', '10-K', 'Note12', 'PART II'),
(45, '45', '10-K', 'Note13', 'PART II'),
(46, '46', '10-K', 'Note14', 'PART II'),
(47, '47', '10-K', 'Note15', 'PART II'),
(48, '48', '10-K', 'Note16', 'PART II'),
(49, '49', '10-K', 'Note17', 'PART II'),
(50, '50', '10-K', 'Note18', 'PART II'),
(51, '51', '10-K', 'Note19', 'PART II'),
(52, '52', '10-K', 'Note20', 'PART II'),
(53, '53', '10-Q', 'Cover', ''),
(54, '54', '10-Q', 'INDEX', ''),
(55, '55', '10-Q', 'PIItem1', 'PART I - FINANCIAL INFORMATION'),
(56, '56', '10-Q', 'PIItem2', 'PART I - FINANCIAL INFORMATION'),
(57, '57', '10-Q', 'PIItem3', 'PART I - FINANCIAL INFORMATION'),
(58, '58', '10-Q', 'PIItem4', 'PART I - FINANCIAL INFORMATION'),
(59, '59', '10-Q', 'PIItem4T', 'PART I - FINANCIAL INFORMATION'),
(60, '60', '10-Q', 'PIIItem1', 'PART II - OTHER INFORMATION'),
(61, '61', '10-Q', 'PIIItem1A', 'PART II - OTHER INFORMATION'),
(62, '62', '10-Q', 'PIIItem2', 'PART II - OTHER INFORMATION'),
(63, '63', '10-Q', 'PIIItem3', 'PART II - OTHER INFORMATION'),
(64, '64', '10-Q', 'PIIItem4', 'PART II - OTHER INFORMATION'),
(65, '65', '10-Q', 'PIIItem5', 'PART II - OTHER INFORMATION'),
(66, '66', '10-Q', 'PIIItem6', 'PART II - OTHER INFORMATION'),
(67, '67', '10-Q', 'Signature', ''),
(68, '68', '10-Q', 'Exhibit_Index', ''),
(69, '69', '10-Q', 'Opinion', 'PART I - FINANCIAL INFORMATION'),
(70, '70', '10-Q', 'Controls', 'PART I - FINANCIAL INFORMATION'),
(71, '71', '10-Q', 'BalanceSheet', 'PART I - FINANCIAL INFORMATION'),
(72, '72', '10-Q', 'IncomeStatement', 'PART I - FINANCIAL INFORMATION'),
(73, '73', '10-Q', 'ComprehensiveIncome', 'PART I - FINANCIAL INFORMATION'),
(74, '74', '10-Q', 'EquityStatement', 'PART I - FINANCIAL INFORMATION'),
(75, '75', '10-Q', 'CashFlows', 'PART I - FINANCIAL INFORMATION'),
(76, '76', '10-Q', 'Note1', 'PART I - FINANCIAL INFORMATION'),
(77, '77', '10-Q', 'Note2', 'PART I - FINANCIAL INFORMATION'),
(78, '78', '10-Q', 'Note3', 'PART I - FINANCIAL INFORMATION'),
(79, '79', '10-Q', 'Note4', 'PART I - FINANCIAL INFORMATION'),
(80, '80', '10-Q', 'Note5', 'PART I - FINANCIAL INFORMATION'),
(81, '81', '10-Q', 'Note6', 'PART I - FINANCIAL INFORMATION'),
(82, '82', '10-Q', 'Note7', 'PART I - FINANCIAL INFORMATION'),
(83, '83', '10-Q', 'Note8', 'PART I - FINANCIAL INFORMATION'),
(84, '84', '10-Q', 'Note9', 'PART I - FINANCIAL INFORMATION'),
(85, '85', '10-Q', 'Note10', 'PART I - FINANCIAL INFORMATION'),
(86, '86', '10-Q', 'Note11', 'PART I - FINANCIAL INFORMATION'),
(87, '87', '10-Q', 'Note12', 'PART I - FINANCIAL INFORMATION'),
(88, '88', '10-Q', 'Note13', 'PART I - FINANCIAL INFORMATION'),
(89, '89', '10-Q', 'Note14', 'PART I - FINANCIAL INFORMATION'),
(90, '90', '10-Q', 'Note15', 'PART I - FINANCIAL INFORMATION'),
(91, '91', '10-Q', 'Note16', 'PART I - FINANCIAL INFORMATION'),
(92, '92', '10-Q', 'Note17', 'PART I - FINANCIAL INFORMATION'),
(93, '93', '10-Q', 'Note18', 'PART I - FINANCIAL INFORMATION'),
(94, '94', '10-Q', 'Note19', 'PART I - FINANCIAL INFORMATION'),
(95, '95', '10-Q', 'Note20', 'PART I - FINANCIAL INFORMATION'),
(96, '96', '8-K', 'Cover', ''),
(97, '97', '8-K', 'INDEX', ''),
(98, '98', '8-K', 'P1Item1_01', 'SECTION 1 - REGISTRANT''S BUSINESS AND OPERATIONS'),
(99, '99', '8-K', 'P1Item1_02', 'SECTION 1 - REGISTRANT''S BUSINESS AND OPERATIONS'),
(100, '100', '8-K', 'P1Item1_03', 'SECTION 1 - REGISTRANT''S BUSINESS AND OPERATIONS'),
(101, '101', '8-K', 'P2Item2_01', 'SECTION 2 - FINANCIAL INFORMATION'),
(102, '102', '8-K', 'P2Item2_02', 'SECTION 2 - FINANCIAL INFORMATION'),
(103, '103', '8-K', 'P2Item2_03', 'SECTION 2 - FINANCIAL INFORMATION'),
(104, '104', '8-K', 'P2Item2_04', 'SECTION 2 - FINANCIAL INFORMATION'),
(105, '105', '8-K', 'P2Item2_05', 'SECTION 2 - FINANCIAL INFORMATION'),
(106, '106', '8-K', 'P2Item2_06', 'SECTION 2 - FINANCIAL INFORMATION'),
(107, '107', '8-K', 'P3Item3_01', 'SECTION 3 - SECURITIES AND TRADING MARKETS'),
(108, '108', '8-K', 'P3Item3_02', 'SECTION 3 - SECURITIES AND TRADING MARKETS'),
(109, '109', '8-K', 'P3Item3_03', 'SECTION 3 - SECURITIES AND TRADING MARKETS'),
(110, '110', '8-K', 'P4Item4_01', 'SECTION 4 - MATTERS RELATED TO ACCOUNTANTS AND FINANCIAL STATEMENTS'),
(111, '111', '8-K', 'P4Item4_02', 'SECTION 4 - MATTERS RELATED TO ACCOUNTANTS AND FINANCIAL STATEMENTS'),
(112, '112', '8-K', 'P5Item5_01', 'SECTION 5 - CORPORATE GOVERNANCE AND MANAGEMENT'),
(113, '113', '8-K', 'P5Item5_02', 'SECTION 5 - CORPORATE GOVERNANCE AND MANAGEMENT'),
(114, '114', '8-K', 'P5Item5_03', 'SECTION 5 - CORPORATE GOVERNANCE AND MANAGEMENT'),
(115, '115', '8-K', 'P5Item5_04', 'SECTION 5 - CORPORATE GOVERNANCE AND MANAGEMENT'),
(116, '116', '8-K', 'P5Item5_05', 'SECTION 5 - CORPORATE GOVERNANCE AND MANAGEMENT'),
(117, '117', '8-K', 'P5Item5_06', 'SECTION 5 - CORPORATE GOVERNANCE AND MANAGEMENT'),
(118, '118', '8-K', 'P6Item6_01', 'SECTION 6 - ASSET-BACKED SECURITIES'),
(119, '119', '8-K', 'P6Item6_02', 'SECTION 6 - ASSET-BACKED SECURITIES'),
(120, '120', '8-K', 'P6Item6_03', 'SECTION 6 - ASSET-BACKED SECURITIES'),
(121, '121', '8-K', 'P6Item6_04', 'SECTION 6 - ASSET-BACKED SECURITIES'),
(122, '122', '8-K', 'P6Item6_05', 'SECTION 6 - ASSET-BACKED SECURITIES'),
(123, '123', '8-K', 'P7Item7_01', 'SECTION 7 - REGULATION FD'),
(124, '124', '8-K', 'P8Item8_01', 'SECTION 8 - OTHER EVENTS'),
(125, '125', '8-K', 'P9Item9_01', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(126, '126', '8-K', 'Signature', ''),
(127, '127', '8-K', 'Exhibit_Index', ''),
(128, '128', '8-K', 'Opinion', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(129, '129', '8-K', 'Controls', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(130, '130', '8-K', 'BalanceSheet', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(131, '131', '8-K', 'IncomeStatement', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(132, '132', '8-K', 'ComprehensiveIncome', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(133, '133', '8-K', 'EquityStatement', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(134, '134', '8-K', 'CashFlows', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(135, '135', '8-K', 'Note1', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(136, '136', '8-K', 'Note2', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(137, '137', '8-K', 'Note3', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(138, '138', '8-K', 'Note4', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(139, '139', '8-K', 'Note5', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(140, '140', '8-K', 'Note6', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(141, '141', '8-K', 'Note7', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(142, '142', '8-K', 'Note8', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(143, '143', '8-K', 'Note9', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(144, '144', '8-K', 'Note10', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(145, '145', '8-K', 'Note11', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(146, '146', '8-K', 'Note12', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(147, '147', '8-K', 'Note13', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(148, '148', '8-K', 'Note14', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(149, '149', '8-K', 'Note15', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(150, '150', '8-K', 'Note16', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(151, '151', '8-K', 'Note17', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(152, '152', '8-K', 'Note18', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(153, '153', '8-K', 'Note19', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(154, '154', '8-K', 'Note20', 'SECTION 9 - FINANCIAL STATEMENTS AND EXHIBITS'),
(155, '155', 'S-1', 'Cover', ''),
(156, '156', 'S-1', 'INDEX', ''),
(157, '157', 'S-1', 'PIItem1', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(158, '158', 'S-1', 'PIItem2', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(159, '159', 'S-1', 'PIItem3', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(160, '160', 'S-1', 'PIItem4', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(161, '161', 'S-1', 'PIItem5', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(162, '162', 'S-1', 'PIItem6', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(163, '163', 'S-1', 'PIItem7', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(164, '164', 'S-1', 'PIItem8', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(165, '165', 'S-1', 'PIItem9', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(166, '166', 'S-1', 'PIItem10', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(167, '167', 'S-1', 'PIItem11', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(168, '168', 'S-1', 'PIItem11A', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(169, '169', 'S-1', 'PIItem12', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(170, '170', 'S-1', 'PIItem12A', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(171, '171', 'S-1', 'PIIItem13', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(172, '172', 'S-1', 'PIIItem14', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(173, '173', 'S-1', 'PIIItem15', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(174, '174', 'S-1', 'PIIItem16', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(175, '175', 'S-1', 'PIIItem17', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(176, '176', 'S-1', 'Signature', ''),
(177, '177', 'S-1', 'Exhibit_Index', ''),
(178, '178', 'S-1', 'Opinion', ''),
(179, '179', 'S-1', 'Controls', ''),
(180, '180', 'S-1', 'BalanceSheet', ''),
(181, '181', 'S-1', 'IncomeStatement', ''),
(182, '182', 'S-1', 'ComprehensiveIncome', ''),
(183, '183', 'S-1', 'EquityStatement', ''),
(184, '184', 'S-1', 'CashFlows', ''),
(185, '185', 'S-1', 'Note1', ''),
(186, '186', 'S-1', 'Note2', ''),
(187, '187', 'S-1', 'Note3', ''),
(188, '188', 'S-1', 'Note4', ''),
(189, '189', 'S-1', 'Note5', ''),
(190, '190', 'S-1', 'Note6', ''),
(191, '191', 'S-1', 'Note7', ''),
(192, '192', 'S-1', 'Note8', ''),
(193, '193', 'S-1', 'Note9', ''),
(194, '194', 'S-1', 'Note10', ''),
(195, '195', 'S-1', 'Note11', ''),
(196, '196', 'S-1', 'Note12', ''),
(197, '197', 'S-1', 'Note13', ''),
(198, '198', 'S-1', 'Note14', ''),
(199, '199', 'S-1', 'Note15', ''),
(200, '200', 'S-1', 'Note16', ''),
(201, '201', 'S-1', 'Note17', ''),
(202, '202', 'S-1', 'Note18', ''),
(203, '203', 'S-1', 'Note19', ''),
(204, '204', 'S-1', 'Note20', ''),
(205, '205', 'S-1', 'BalanceSheetii', ''),
(206, '206', 'S-1', 'IncomeStatementii', ''),
(207, '207', 'S-1', 'ComprehensiveIncomeii', ''),
(208, '208', 'S-1', 'EquityStatementii', ''),
(209, '209', 'S-1', 'CashFlowsii', ''),
(210, '210', 'S-1', 'Note1ii', ''),
(211, '211', 'S-1', 'Note2ii', ''),
(212, '212', 'S-1', 'Note3ii', ''),
(213, '213', 'S-1', 'Note4ii', ''),
(214, '214', 'S-1', 'Note5ii', ''),
(215, '215', 'S-1', 'Note6ii', ''),
(216, '216', 'S-1', 'Note7ii', ''),
(217, '217', 'S-1', 'Note8ii', ''),
(218, '218', 'S-1', 'Note9ii', ''),
(219, '219', 'S-1', 'Note10ii', ''),
(220, '220', 'S-1', 'Note11ii', ''),
(221, '221', 'S-1', 'Note12ii', ''),
(222, '222', 'S-1', 'Note13ii', ''),
(223, '223', 'S-1', 'Note14ii', ''),
(224, '224', 'S-1', 'Note15ii', ''),
(225, '225', 'S-1', 'Note16ii', ''),
(226, '226', 'S-1', 'Note17ii', ''),
(227, '227', 'S-1', 'Note18ii', ''),
(228, '228', 'S-1', 'Note19ii', ''),
(229, '229', 'S-1', 'Note20ii', ''),
(230, '230', 'S-3', 'Cover', ''),
(231, '231', 'S-3', 'INDEX', ''),
(232, '232', 'S-3', 'PIItem1', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(233, '233', 'S-3', 'PIItem2', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(234, '234', 'S-3', 'PIItem3', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(235, '235', 'S-3', 'PIItem4', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(236, '236', 'S-3', 'PIItem5', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(237, '237', 'S-3', 'PIItem6', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(238, '238', 'S-3', 'PIItem7', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(239, '239', 'S-3', 'PIItem8', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(240, '240', 'S-3', 'PIItem9', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(241, '241', 'S-3', 'PIItem10', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(242, '242', 'S-3', 'PIItem11', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(243, '243', 'S-3', 'PIItem12', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(244, '244', 'S-3', 'PIItem13', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(245, '245', 'S-3', 'PIIItem14', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(246, '246', 'S-3', 'PIIItem15', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(247, '247', 'S-3', 'PIIItem16', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(248, '248', 'S-3', 'PIIItem17', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(249, '249', 'S-3', 'Signature', ''),
(250, '250', 'S-3', 'Exhibit_Index', ''),
(251, '251', 'S-3', 'Opinion', ''),
(252, '252', 'S-3', 'Controls', ''),
(253, '253', 'S-3', 'BalanceSheet', ''),
(254, '254', 'S-3', 'IncomeStatement', ''),
(255, '255', 'S-3', 'ComprehensiveIncome', ''),
(256, '256', 'S-3', 'EquityStatement', ''),
(257, '257', 'S-3', 'CashFlows', ''),
(258, '258', 'S-3', 'Note1', ''),
(259, '259', 'S-3', 'Note2', ''),
(260, '260', 'S-3', 'Note3', ''),
(261, '261', 'S-3', 'Note4', ''),
(262, '262', 'S-3', 'Note5', ''),
(263, '263', 'S-3', 'Note6', ''),
(264, '264', 'S-3', 'Note7', ''),
(265, '265', 'S-3', 'Note8', ''),
(266, '266', 'S-3', 'Note9', ''),
(267, '267', 'S-3', 'Note10', ''),
(268, '268', 'S-3', 'Note11', ''),
(269, '269', 'S-3', 'Note12', ''),
(270, '270', 'S-3', 'Note13', ''),
(271, '271', 'S-3', 'Note14', ''),
(272, '272', 'S-3', 'Note15', ''),
(273, '273', 'S-3', 'Note16', ''),
(274, '274', 'S-3', 'Note17', ''),
(275, '275', 'S-3', 'Note18', ''),
(276, '276', 'S-3', 'Note19', ''),
(277, '277', 'S-3', 'Note20', ''),
(278, '278', 'S-3', 'BalanceSheetii', ''),
(279, '279', 'S-3', 'IncomeStatementii', ''),
(280, '280', 'S-3', 'ComprehensiveIncomeii', ''),
(281, '281', 'S-3', 'EquityStatementii', ''),
(282, '282', 'S-3', 'CashFlowsii', ''),
(283, '283', 'S-3', 'Note1ii', ''),
(284, '284', 'S-3', 'Note2ii', ''),
(285, '285', 'S-3', 'Note3ii', ''),
(286, '286', 'S-3', 'Note4ii', ''),
(287, '287', 'S-3', 'Note5ii', ''),
(288, '288', 'S-3', 'Note6ii', ''),
(289, '289', 'S-3', 'Note7ii', ''),
(290, '290', 'S-3', 'Note8ii', ''),
(291, '291', 'S-3', 'Note9ii', ''),
(292, '292', 'S-3', 'Note10ii', ''),
(293, '293', 'S-3', 'Note11ii', ''),
(294, '294', 'S-3', 'Note12ii', ''),
(295, '295', 'S-3', 'Note13ii', ''),
(296, '296', 'S-3', 'Note14ii', ''),
(297, '297', 'S-3', 'Note15ii', ''),
(298, '298', 'S-3', 'Note16ii', ''),
(299, '299', 'S-3', 'Note17ii', ''),
(300, '300', 'S-3', 'Note18ii', ''),
(301, '301', 'S-3', 'Note19ii', ''),
(302, '302', 'S-3', 'Note20ii', ''),
(303, '303', 'S-8', 'Cover', ''),
(304, '304', 'S-8', 'INDEX', ''),
(305, '305', 'S-8', 'PIItem1', 'PART I - INFORMATION REQUIRED IN THE SECTION 10(a) PROSPECTUS'),
(306, '306', 'S-8', 'PIItem2', 'PART I - INFORMATION REQUIRED IN THE SECTION 10(a) PROSPECTUS'),
(307, '307', 'S-8', 'PIIItem3', 'PART II - INFORMATION REQUIRED IN THE REGISTRATION STATEMENT'),
(308, '308', 'S-8', 'PIIItem4', 'PART II - INFORMATION REQUIRED IN THE REGISTRATION STATEMENT'),
(309, '309', 'S-8', 'PIIItem5', 'PART II - INFORMATION REQUIRED IN THE REGISTRATION STATEMENT'),
(310, '310', 'S-8', 'PIIItem6', 'PART II - INFORMATION REQUIRED IN THE REGISTRATION STATEMENT'),
(311, '311', 'S-8', 'PIIItem7', 'PART II - INFORMATION REQUIRED IN THE REGISTRATION STATEMENT'),
(312, '312', 'S-8', 'PIIItem8', 'PART II - INFORMATION REQUIRED IN THE REGISTRATION STATEMENT'),
(313, '313', 'S-8', 'PIIItem9', 'PART II - INFORMATION REQUIRED IN THE REGISTRATION STATEMENT'),
(314, '314', 'S-8', 'Signature', ''),
(315, '315', 'S-8', 'Exhibit_Index', ''),
(316, '316', 'S-8', 'Opinion', ''),
(317, '317', 'S-8', 'Controls', ''),
(318, '318', 'S-8', 'BalanceSheet', ''),
(319, '319', 'S-8', 'IncomeStatement', ''),
(320, '320', 'S-8', 'ComprehensiveIncome', ''),
(321, '321', 'S-8', 'EquityStatement', ''),
(322, '322', 'S-8', 'CashFlows', ''),
(323, '323', 'S-8', 'Note1', ''),
(324, '324', 'S-8', 'Note2', ''),
(325, '325', 'S-8', 'Note3', ''),
(326, '326', 'S-8', 'Note4', ''),
(327, '327', 'S-8', 'Note5', ''),
(328, '328', 'S-8', 'Note6', ''),
(329, '329', 'S-8', 'Note7', ''),
(330, '330', 'S-8', 'Note8', ''),
(331, '331', 'S-8', 'Note9', ''),
(332, '332', 'S-8', 'Note10', ''),
(333, '333', 'S-8', 'Note11', ''),
(334, '334', 'S-8', 'Note12', ''),
(335, '335', 'S-8', 'Note13', ''),
(336, '336', 'S-8', 'Note14', ''),
(337, '337', 'S-8', 'Note15', ''),
(338, '338', 'S-8', 'Note16', ''),
(339, '339', 'S-8', 'Note17', ''),
(340, '340', 'S-8', 'Note18', ''),
(341, '341', 'S-8', 'Note19', ''),
(342, '342', 'S-8', 'Note20', ''),
(343, '343', 'S-8', 'BalanceSheetii', ''),
(344, '344', 'S-8', 'IncomeStatementii', ''),
(345, '345', 'S-8', 'ComprehensiveIncomeii', ''),
(346, '346', 'S-8', 'EquityStatementii', ''),
(347, '347', 'S-8', 'CashFlowsii', ''),
(348, '348', 'S-8', 'Note1ii', ''),
(349, '349', 'S-8', 'Note2ii', ''),
(350, '350', 'S-8', 'Note3ii', ''),
(351, '351', 'S-8', 'Note4ii', ''),
(352, '352', 'S-8', 'Note5ii', ''),
(353, '353', 'S-8', 'Note6ii', ''),
(354, '354', 'S-8', 'Note7ii', ''),
(355, '355', 'S-8', 'Note8ii', ''),
(356, '356', 'S-8', 'Note9ii', ''),
(357, '357', 'S-8', 'Note10ii', ''),
(358, '358', 'S-8', 'Note11ii', ''),
(359, '359', 'S-8', 'Note12ii', ''),
(360, '360', 'S-8', 'Note13ii', ''),
(361, '361', 'S-8', 'Note14ii', ''),
(362, '362', 'S-8', 'Note15ii', ''),
(363, '363', 'S-8', 'Note16ii', ''),
(364, '364', 'S-8', 'Note17ii', ''),
(365, '365', 'S-8', 'Note18ii', ''),
(366, '366', 'S-8', 'Note19ii', ''),
(367, '367', 'S-8', 'Note20ii', ''),
(368, '368', 'S-11', 'Cover', ''),
(369, '369', 'S-11', 'INDEX', ''),
(370, '370', 'S-11', 'PIItem1', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(371, '371', 'S-11', 'PIItem2', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(372, '372', 'S-11', 'PIItem3', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(373, '373', 'S-11', 'PIItem4', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(374, '374', 'S-11', 'PIItem5', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(375, '375', 'S-11', 'PIItem6', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(376, '376', 'S-11', 'PIItem7', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(377, '377', 'S-11', 'PIItem8', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(378, '378', 'S-11', 'PIItem9', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(379, '379', 'S-11', 'PIItem10', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(380, '380', 'S-11', 'PIItem11', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(381, '381', 'S-11', 'PIItem12', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(382, '382', 'S-11', 'PIItem13', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(383, '383', 'S-11', 'PIItem14', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(384, '384', 'S-11', 'PIItem15', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(385, '385', 'S-11', 'PIItem16', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(386, '386', 'S-11', 'PIItem17', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(387, '387', 'S-11', 'PIItem18', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(388, '388', 'S-11', 'PIItem19', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(389, '389', 'S-11', 'PIItem20', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(390, '390', 'S-11', 'PIItem21', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(391, '391', 'S-11', 'PIItem22', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(392, '392', 'S-11', 'PIItem23', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(393, '393', 'S-11', 'PIItem24', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(394, '394', 'S-11', 'PIItem25', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(395, '395', 'S-11', 'PIItem26', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(396, '396', 'S-11', 'PIItem27', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(397, '397', 'S-11', 'PIItem28', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(398, '398', 'S-11', 'PIItem28A', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(399, '399', 'S-11', 'PIItem29', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(400, '400', 'S-11', 'PIItem29A', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(401, '401', 'S-11', 'PIItem30', 'PART I - INFORMATION REQUIRED IN PROSPECTUS'),
(402, '402', 'S-11', 'PIIItem31', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(403, '403', 'S-11', 'PIIItem32', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(404, '404', 'S-11', 'PIIItem33', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(405, '405', 'S-11', 'PIIItem34', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(406, '406', 'S-11', 'PIIItem35', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(407, '407', 'S-11', 'PIIItem36', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(408, '408', 'S-11', 'PIIItem37', 'PART II - INFORMATION NOT REQUIRED IN PROSPECTUS'),
(409, '409', 'S-11', 'Signature', ''),
(410, '410', 'S-11', 'Exhibit_Index', ''),
(411, '411', 'S-11', 'Opinion', ''),
(412, '412', 'S-11', 'Controls', ''),
(413, '413', 'S-11', 'BalanceSheet', ''),
(414, '414', 'S-11', 'IncomeStatement', ''),
(415, '415', 'S-11', 'ComprehensiveIncome', ''),
(416, '416', 'S-11', 'EquityStatement', ''),
(417, '417', 'S-11', 'CashFlows', ''),
(418, '418', 'S-11', 'Note1', ''),
(419, '419', 'S-11', 'Note2', ''),
(420, '420', 'S-11', 'Note3', ''),
(421, '421', 'S-11', 'Note4', ''),
(422, '422', 'S-11', 'Note5', ''),
(423, '423', 'S-11', 'Note6', ''),
(424, '424', 'S-11', 'Note7', ''),
(425, '425', 'S-11', 'Note8', ''),
(426, '426', 'S-11', 'Note9', ''),
(427, '427', 'S-11', 'Note10', ''),
(428, '428', 'S-11', 'Note11', ''),
(429, '429', 'S-11', 'Note12', ''),
(430, '430', 'S-11', 'Note13', ''),
(431, '431', 'S-11', 'Note14', ''),
(432, '432', 'S-11', 'Note15', ''),
(433, '433', 'S-11', 'Note16', ''),
(434, '434', 'S-11', 'Note17', ''),
(435, '435', 'S-11', 'Note18', ''),
(436, '436', 'S-11', 'Note19', ''),
(437, '437', 'S-11', 'Note20', ''),
(438, '438', 'S-11', 'BalanceSheetii', ''),
(439, '439', 'S-11', 'IncomeStatementii', ''),
(440, '440', 'S-11', 'ComprehensiveIncomeii', ''),
(441, '441', 'S-11', 'EquityStatementii', ''),
(442, '442', 'S-11', 'CashFlowsii', ''),
(443, '443', 'S-11', 'Note1ii', ''),
(444, '444', 'S-11', 'Note2ii', ''),
(445, '445', 'S-11', 'Note3ii', ''),
(446, '446', 'S-11', 'Note4ii', ''),
(447, '447', 'S-11', 'Note5ii', ''),
(448, '448', 'S-11', 'Note6ii', ''),
(449, '449', 'S-11', 'Note7ii', ''),
(450, '450', 'S-11', 'Note8ii', ''),
(451, '451', 'S-11', 'Note9ii', ''),
(452, '452', 'S-11', 'Note10ii', ''),
(453, '453', 'S-11', 'Note11ii', ''),
(454, '454', 'S-11', 'Note12ii', ''),
(455, '455', 'S-11', 'Note13ii', ''),
(456, '456', 'S-11', 'Note14ii', ''),
(457, '457', 'S-11', 'Note15ii', ''),
(458, '458', 'S-11', 'Note16ii', ''),
(459, '459', 'S-11', 'Note17ii', ''),
(460, '460', 'S-11', 'Note18ii', ''),
(461, '461', 'S-11', 'Note19ii', ''),
(462, '462', 'S-11', 'Note20ii', ''),
(463, '463', '424B3', 'Cover', ''),
(464, '464', '424B3', 'INDEX', ''),
(465, '465', '424B3', 'Part1', ''),
(466, '466', '424B3', 'Part2', ''),
(467, '467', '424B3', 'Part3', ''),
(468, '468', '424B3', 'Part4', ''),
(469, '469', '424B3', 'Part5', ''),
(470, '470', '424B3', 'Part6', ''),
(471, '471', '424B3', 'Part7', ''),
(472, '472', '424B3', 'Part8', ''),
(473, '473', '424B3', 'Part9', ''),
(474, '474', '424B3', 'Part10', ''),
(475, '475', '424B3', 'Part11', ''),
(476, '476', '424B3', 'Part12', ''),
(477, '477', '424B3', 'Part13', ''),
(478, '478', '424B3', 'Part14', ''),
(479, '479', '424B3', 'Part15', ''),
(480, '480', '424B3', 'Part16', ''),
(481, '481', '424B3', 'Part17', ''),
(482, '482', '424B3', 'Part18', ''),
(483, '483', '424B3', 'Part19', ''),
(484, '484', '424B3', 'Part20', ''),
(485, '485', '424B3', 'BalanceSheet', ''),
(486, '486', '424B3', 'IncomeStatement', ''),
(487, '487', '424B3', 'ComprehensiveIncome', ''),
(488, '488', '424B3', 'EquityStatement', ''),
(489, '489', '424B3', 'CashFlows', ''),
(490, '490', '424B3', 'Note1', ''),
(491, '491', '424B3', 'Note2', ''),
(492, '492', '424B3', 'Note3', ''),
(493, '493', '424B3', 'Note4', ''),
(494, '494', '424B3', 'Note5', ''),
(495, '495', '424B3', 'Note6', ''),
(496, '496', '424B3', 'Note7', ''),
(497, '497', '424B3', 'Note8', ''),
(498, '498', '424B3', 'Note9', ''),
(499, '499', '424B3', 'Note10', ''),
(500, '500', '424B3', 'Note11', ''),
(501, '501', '424B3', 'Note12', ''),
(502, '502', '424B3', 'Note13', ''),
(503, '503', '424B3', 'Note14', ''),
(504, '504', '424B3', 'Note15', ''),
(505, '505', '424B3', 'Note16', ''),
(506, '506', '424B3', 'Note17', ''),
(507, '507', '424B3', 'Note18', ''),
(508, '508', '424B3', 'Note19', ''),
(509, '509', '424B3', 'Note20', ''),
(510, '510', '424B3', 'Signature', ''),
(511, '511', '424B3', 'Exhibit_Index', ''),
(512, '512', '485BPOS', 'Cover', ''),
(513, '513', '485BPOS', 'INDEX', ''),
(514, '514', '485BPOS', 'Part1', ''),
(515, '515', '485BPOS', 'Part2', ''),
(516, '516', '485BPOS', 'Part3', ''),
(517, '517', '485BPOS', 'Part4', ''),
(518, '518', '485BPOS', 'Part5', ''),
(519, '519', '485BPOS', 'Part6', ''),
(520, '520', '485BPOS', 'Part7', ''),
(521, '521', '485BPOS', 'Part8', ''),
(522, '522', '485BPOS', 'Part9', ''),
(523, '523', '485BPOS', 'Part10', ''),
(524, '524', '485BPOS', 'Part11', ''),
(525, '525', '485BPOS', 'Part12', ''),
(526, '526', '485BPOS', 'Part13', ''),
(527, '527', '485BPOS', 'Part14', ''),
(528, '528', '485BPOS', 'Part15', ''),
(529, '529', '485BPOS', 'Part16', ''),
(530, '530', '485BPOS', 'Part17', ''),
(531, '531', '485BPOS', 'Part18', ''),
(532, '532', '485BPOS', 'Part19', ''),
(533, '533', '485BPOS', 'Part20', ''),
(534, '534', '485BPOS', 'BalanceSheet', ''),
(535, '535', '485BPOS', 'IncomeStatement', ''),
(536, '536', '485BPOS', 'ComprehensiveIncome', ''),
(537, '537', '485BPOS', 'EquityStatement', ''),
(538, '538', '485BPOS', 'CashFlows', ''),
(539, '539', '485BPOS', 'Note1', ''),
(540, '540', '485BPOS', 'Note2', ''),
(541, '541', '485BPOS', 'Note3', ''),
(542, '542', '485BPOS', 'Note4', ''),
(543, '543', '485BPOS', 'Note5', ''),
(544, '544', '485BPOS', 'Note6', ''),
(545, '545', '485BPOS', 'Note7', ''),
(546, '546', '485BPOS', 'Note8', ''),
(547, '547', '485BPOS', 'Note9', ''),
(548, '548', '485BPOS', 'Note10', ''),
(549, '549', '485BPOS', 'Note11', ''),
(550, '550', '485BPOS', 'Note12', ''),
(551, '551', '485BPOS', 'Note13', ''),
(552, '552', '485BPOS', 'Note14', ''),
(553, '553', '485BPOS', 'Note15', ''),
(554, '554', '485BPOS', 'Note16', ''),
(555, '555', '485BPOS', 'Note17', ''),
(556, '556', '485BPOS', 'Note18', ''),
(557, '557', '485BPOS', 'Note19', ''),
(558, '558', '485BPOS', 'Note20', ''),
(559, '559', '485BPOS', 'Signature', ''),
(560, '560', '485BPOS', 'Exhibit_Index', ''),
(561, '561', '497', 'Cover', ''),
(562, '562', '497', 'INDEX', ''),
(563, '563', '497', 'Part1', ''),
(564, '564', '497', 'Part2', ''),
(565, '565', '497', 'Part3', ''),
(566, '566', '497', 'Part4', ''),
(567, '567', '497', 'Part5', ''),
(568, '568', '497', 'Part6', ''),
(569, '569', '497', 'Part7', ''),
(570, '570', '497', 'Part8', ''),
(571, '571', '497', 'Part9', ''),
(572, '572', '497', 'Part10', ''),
(573, '573', '497', 'Part11', ''),
(574, '574', '497', 'Part12', ''),
(575, '575', '497', 'Part13', ''),
(576, '576', '497', 'Part14', ''),
(577, '577', '497', 'Part15', ''),
(578, '578', '497', 'Part16', ''),
(579, '579', '497', 'Part17', ''),
(580, '580', '497', 'Part18', ''),
(581, '581', '497', 'Part19', ''),
(582, '582', '497', 'Part20', ''),
(583, '583', '497', 'BalanceSheet', ''),
(584, '584', '497', 'IncomeStatement', ''),
(585, '585', '497', 'ComprehensiveIncome', ''),
(586, '586', '497', 'EquityStatement', ''),
(587, '587', '497', 'CashFlows', ''),
(588, '588', '497', 'Note1', ''),
(589, '589', '497', 'Note2', ''),
(590, '590', '497', 'Note3', ''),
(591, '591', '497', 'Note4', ''),
(592, '592', '497', 'Note5', ''),
(593, '593', '497', 'Note6', ''),
(594, '594', '497', 'Note7', ''),
(595, '595', '497', 'Note8', ''),
(596, '596', '497', 'Note9', ''),
(597, '597', '497', 'Note10', ''),
(598, '598', '497', 'Note11', ''),
(599, '599', '497', 'Note12', ''),
(600, '600', '497', 'Note13', ''),
(601, '601', '497', 'Note14', ''),
(602, '602', '497', 'Note15', ''),
(603, '603', '497', 'Note16', ''),
(604, '604', '497', 'Note17', ''),
(605, '605', '497', 'Note18', ''),
(606, '606', '497', 'Note19', ''),
(607, '607', '497', 'Note20', ''),
(608, '608', '497', 'Signature', ''),
(609, '609', '497', 'Exhibit_Index', '');

-- --------------------------------------------------------

--
-- Table structure for table `FormTypes`
--

CREATE TABLE `FormTypes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `formType` varchar(10) NOT NULL,
  `formDescription` varchar(300) NOT NULL,
  `dateType` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=393 ;

--
-- Dumping data for table `FormTypes`
--

INSERT INTO `FormTypes` (`id`, `formType`, `formDescription`, `dateType`) VALUES
(1, '3', 'Initial statement of beneficial ownership of securities', 'Event Date\r'),
(2, '4', 'Statement of changes in beneficial ownership of securities', 'Event Date\r'),
(3, '5', 'Annual statement of changes in beneficial ownership of securities', 'Period End\r'),
(4, '15', 'Certification and notice of termination of registration under Section 12(g) or suspension of duty to file reports under Sections 13 and 15(d)', 'Event Date\r'),
(5, '18', 'Application for registration pursuant to Section 12(b) & (c) of the Securities Exchange Act of 1934', 'Event Date\r'),
(6, '25', 'Notification filed by issuer to voluntarily withdraw a class of securities from listing and registration on a national securities exchange', 'Event Date\r'),
(7, '144', 'Filing for proposed sale of securities under Rule 144', 'Event Date\r'),
(8, '425', 'Filing under Securities Act Rule 425 of certain prospectuses and communications in connection with business combination transactions', 'Event Date\r'),
(9, '487', 'Pre-effective pricing amendment filed pursuant to Securities Act Rule 487', 'Event Date\r'),
(10, '497', 'Definitive materials filed under paragraph (a), (b), (c), (d), (e) or (f) of Securities Act Rule 497', 'Event Date\r'),
(11, '10-12B', 'Initial general form for registration of a class of securities pursuant to Section 12(b)', 'Event Date\r'),
(12, '10-12B/A', 'Amendment to Form 10-12B', 'Event Date\r'),
(13, '10-12G', 'Initial general form for registration of a class of securities pursuant to Section 12(g)', 'Event Date\r'),
(14, '10-12G/A', 'Amendment to Form 10-12G', 'Event Date\r'),
(15, '10-D', 'Periodic distribution reports by Asset-Backed issuers pursuant to Rule 13a-17 or 15d-17', 'Period End\r'),
(16, '10-D/A', 'Amendment to Form 10-D', 'Period End\r'),
(17, '10-K', 'Annual report pursuant to Section 13 and 15(d)', 'Period End\r'),
(18, '10-K/A', 'Amendment to Form 10-K', 'Period End\r'),
(19, '10-KT', 'Transition report pursuant to Rule 13a-10 or 15d-10', 'Period End\r'),
(20, '10-KT/A', 'Amendment to Form 10-KT', 'Period End\r'),
(21, '10-Q', 'Quarterly report pursuant to sections 13 or 15(d)', 'Period End\r'),
(22, '10-Q/A', 'Amendment to Form 10-Q', 'Period End\r'),
(23, '10-QT', 'Transition report pursuant to Rule 13a-10 or 15d-10', 'Period End\r'),
(24, '10-QT/A', 'Amendment to Form 10-QT', 'Period End\r'),
(25, '11-K', 'Annual report of employee stock purchase, savings and similar plans', 'Period End\r'),
(26, '11-K/A', 'Amendment to Form 11-K', 'Period End\r'),
(27, '11-KT', 'Transition report pursuant to Rule 13a-10 or 15d- 10', 'Period End\r'),
(28, '11-KT/A', 'Amendment to Form 11-KT', 'Period End\r'),
(29, '12b-25', 'Notification of late filing', 'Event Date\r'),
(30, '13F-HR', 'Information required of institutional investment managers pursuant to Section 13(f)', 'Event Date\r'),
(31, '13F-HR/A', 'Information required of institutional investment managers pursuant to Section 13(f)', 'Event Date\r'),
(32, '144/A', 'Amendment to Form 144', 'Event Date\r'),
(33, '15-12B', 'Notice of termination of registration of a class of securities under Section 12(b)', 'Event Date\r'),
(34, '15-12B/A', 'Amendment to Form 15-12B', 'Event Date\r'),
(35, '15-12G', 'Notice of termination of registration of a class of securities under Section 12(g)', 'Event Date\r'),
(36, '15-12G/A', 'Amendment to Form 15-12G', 'Event Date\r'),
(37, '15-15D', 'Notice of suspension of duty to file reports', 'Event Date\r'),
(38, '15-15D/A', 'Amendment to Form 15-15D', 'Event Date\r'),
(39, '15F', 'Certification of a Foreign Private Issuer', 'Event Date\r'),
(40, '15F-12B', 'Notice of termination of a foreign private issuer', 'Event Date\r'),
(41, '15F-12B/A', 'Amendment to Form 15F-12B', 'Event Date\r'),
(42, '15F-12G', 'Notice of termination of a foreign private issuer', 'Event Date\r'),
(43, '15F-12G/A', 'Amendment to Form 15F-12G', 'Event Date\r'),
(44, '15F-15D', 'Notice of a foreign private issuer', 'Event Date\r'),
(45, '15F-15D/A', 'Amendment to Form 15F-15D', 'Event Date\r'),
(46, '18-12B', 'Form for initial registration of securities of foreign governments or political subdivisions pursuant to Section 12(b)', 'Event Date\r'),
(47, '18-12B/A', 'Amendment to Form 18-12B', 'Event Date\r'),
(48, '18-12G', 'Form for initial registration of securities of foreign governments or political subdivisions thereof pursuant to Section 12(g)', 'Event Date\r'),
(49, '18-12G/A', 'Amendment to Form 18-12G', 'Event Date\r'),
(50, '18-K', 'Annual report for foreign governments and political subdivisions', 'Period End\r'),
(51, '18-K/A', 'Amendment to Form 18-K', 'Period End\r'),
(52, '1-A', 'Offering Statement under Regulation A', 'Event Date\r'),
(53, '1-E', 'Notification under Regulation E by small business investment companies and business development companies', 'Event Date\r'),
(54, '1-E AD', 'AD/A Sales material filed pursuant to Rule 607 under Regulation E', 'Event Date\r'),
(55, '1-E AD/A', 'Amendment to Form 1-E AD', 'Event Date\r'),
(56, '1-E/A', 'Amendment to Form 1-E', 'Event Date\r'),
(57, '1-N', 'Form and amendments for notice of registration as a national securities exchange for the sole purpose of trading security futures products', 'Event Date\r'),
(58, '20-F', 'Annual and transition report of foreign private issuers  pursuant to sections 13 or 15(d)', 'Event Date\r'),
(59, '20-F/A', 'Amendment to Form 20-F', 'Event Date\r'),
(60, '20FR12B', 'Form for initial registration of a class of securities of foreign private issuers pursuant to Section 12(b)', 'Event Date\r'),
(61, '20FR12B/A', 'Amendment to Form 20FR12B', 'Event Date\r'),
(62, '20FR12G', 'Form for initial registration of a class of securities of foreign private issuers pursuant to Section 12(g)', 'Event Date\r'),
(63, '20FR12G/A', 'Amendment to Form 20FR12G', 'Event Date\r'),
(64, '24F-2NT', 'Rule 24F-2 notice filed on Form 24F-2', 'Event Date\r'),
(65, '24F-2NT/A', 'Amendment to Form 24F-2NT', 'Event Date\r'),
(66, '25/A', 'Amendment to Form 25', 'Event Date\r'),
(67, '2-A', 'Report of sales and use of proceeds pursuant to Rule 257 of Regulation A', 'Event Date\r'),
(68, '2-E', 'Report of sales of securities pursuant to Rule 609', 'Event Date\r'),
(69, '2-E/A', 'Amendment to Form 2-E', 'Event Date\r'),
(70, '3/A', 'Amendment to Form 3', 'Event Date\r'),
(71, '305B2', 'Application for designation of a new trustee under the Trust Indenture Act', 'Event Date\r'),
(72, '305B2/A', 'Amendment to Form 305B2', 'Event Date\r'),
(73, '4/A', 'Amendment to Form 4', 'Event Date\r'),
(74, '40-17F1', 'Initial certificate of accounting of securities and similar investments in the custody of management investment companies filed pursuant to Rule 17f-1 of the Investment Company Act of 1940 filed on Form N-17F-1', 'Event Date\r'),
(75, '40-17F1/A', 'Amendment to Form 40-17F1', 'Event Date\r'),
(76, '40-17F2', 'Initial certificate of accounting of securities and similar investments in the custody of management investment companies filed pursuant to Rule 17f-2 of the Investment Company Act of 1940 filed on Form N-17F-2', 'Event Date\r'),
(77, '40-17F2/A', 'Amendment to Form 40-17F2', 'Event Date\r'),
(78, '40-17G', 'Fidelity bond filed pursuant to Rule 17g1(g)(1) of the Investment Company Act of 1940', 'Event Date\r'),
(79, '40-17G/A', 'Amendment to Form 40-17G', 'Event Date\r'),
(80, '40-17GCS', 'Filings of claim or settlement pursuant to Rule 17g-1(g)(1)(2) or (3) of the Investment Company Act of 1940', 'Event Date\r'),
(81, '40-17GCS/A', 'Amendment to Form 40-17GCS', 'Event Date\r'),
(82, '40-24B2', 'Filing of sales literature pursuant to Rule 24b2 under the Investment Company Act of 1940', 'Event Date\r'),
(83, '40-24B2/A', 'Amendment to Form 40-24B2', 'Event Date\r'),
(84, '40-33', 'Copies of all stockholder derivative actions filed with a court against an investment company or an affiliate thereof pursuant to Section 33 of the Investment Company Act of 1940', 'Event Date\r'),
(85, '40-33/A', 'Amendment to Form 40-33', 'Event Date\r'),
(86, '40-6B', 'Application under the Investment Company Act by an employees', 'Event Date\r'),
(87, '40-6B/A', 'Amendment to Form 40-6B', 'Event Date\r'),
(88, '40-8B25', 'Document or report', 'Event Date\r'),
(89, '40-8F-2', 'Initial application for deregistration pursuant to Investment Company Act Rule 0-2', 'Event Date\r'),
(90, '40-8F-2/A', 'Amendment to Form 40-8F-2', 'Event Date\r'),
(91, '40-APP', 'Applications under the Investment Company Act other than those reviewed by Office of Insurance Products', 'Event Date\r'),
(92, '40-APP/2', 'Amendment to Form 40-APP', 'Event Date\r'),
(93, '40-F', 'Annual reports filed by certain Canadian issuers pursuant to Section 15(d) and Rule 15d-4', 'Event Date\r'),
(94, '40-F/A', 'Amendment to Form 40-F', 'Event Date\r'),
(95, '40FR12B', 'Registration of a class of securities of certain Canadian issuers pursuant to Section 12(b) of the 1934 Act', 'Event Date\r'),
(96, '40FR12B/A', 'Amendment to Form 40FR12B', 'Event Date\r'),
(97, '40FR12G', 'Registration of a class of securities of certain Canadian issuers pursuant to Section 12(g) of the 1934 Act', 'Event Date\r'),
(98, '40FR12G/A', 'Amendment to Form 40FR12G', 'Event Date\r'),
(99, '40-OIP', 'Applications under the Investment Company Act reviewed by Office of Insurance Products', 'Event Date\r'),
(100, '40-OIP/A', 'Amendment to Form 40OIP', 'Event Date\r'),
(101, '424A', 'Prospectus filed pursuant to Rule 424(a)', 'Event Date\r'),
(102, '424B1', 'Prospectus filed pursuant to Rule 424(b)(1)', 'Event Date\r'),
(103, '424B2', 'Prospectus filed pursuant to Rule 424(b)(2)', 'Event Date\r'),
(104, '424B3', 'Prospectus filed pursuant to Rule 424(b)(3)', 'Event Date\r'),
(105, '424B4', 'Prospectus filed pursuant to Rule 424(b)(4)', 'Event Date\r'),
(106, '424B5', 'Prospectus filed pursuant to Rule 424(b)(5)', 'Event Date\r'),
(107, '424B7', 'Prospectus filed pursuant to Rule 424(b)(7)', 'Event Date\r'),
(108, '424B8', 'Prospectus filed pursuant to Rule 424(b)(8)', 'Event Date\r'),
(109, '485APOS', 'Post-effective amendment filed pursuant to Securities Act Rule 485(a) (this filing cannot be submitted as a 1940 Act only filing)', 'Event Date\r'),
(110, '485BPOS', 'Post-effective amendment filed pursuant to Securities Act Rule 485(b) (this filing cannot be submitted as a 1940 Act only filing)', 'Event Date\r'),
(111, '485BXT', 'Post-effective amendment filed pursuant to Securities Act Rule 485(b)(1)(iii) to designate a new effective date for a post-effective amendment previously filed pursuant to Securities Act Rule 485(a) (this filing cannot be submitted as a 1940 Act only filing)', 'Event Date\r'),
(112, '486APOS', 'Post-effective amendment to filing filed pursuant to Securities Act Rule 486(a)', 'Event Date\r'),
(113, '486BPOS', 'Post-effective amendment to filing filed pursuant to Securities Act Rule 486(b)', 'Event Date\r'),
(114, '497AD', 'Filing by certain investment companies of Securities Act Rule 482 advertising in accordance with Securities Act Rule 497 and the Note to Rule 482(c)', 'Event Date\r'),
(115, '497H2', 'Filings made pursuant to Rule 497(h)(2)', 'Event Date\r'),
(116, '497J', 'Certification of no change in definitive materials under paragraph (j) of Securities Act Rule 497', 'Event Date\r'),
(117, '497K', 'Summary Prospectus for certain open-end management investment companies filed pursuant to Securities Act Rule 497(k)', 'Event Date\r'),
(118, '5/A', 'Amendment to Form 5', 'Event Date\r'),
(119, '6-K', 'Current report of foreign issuer pursuant to Rules 13a-16 and 15d-16 Amendments', 'Event Date\r'),
(120, '6-K/A', 'Amendment to Form 6-K', 'Event Date\r'),
(121, '8-A12B', 'Form for the registration / listing of a class of securities on a national securities exchange pursuant to Section 12(b)', 'Event Date\r'),
(122, '8-A12B/A', 'Amendment to Form 8-A12B', 'Event Date\r'),
(123, '8-A12G', 'Form for registration of a class of securities pursuant to Section 12(g)', 'Event Date\r'),
(124, '8-A12G/A', 'Amendment to Form 8-A12G', 'Event Date\r'),
(125, '8-K', 'Current report filing', 'Event Date\r'),
(126, '8-K/A', 'Amendment to Form 8-K', 'Event Date\r'),
(127, '8-K12B', 'Notification that a class of securities of successor issuer is deemed to be registered pursuant to Section 12(b)', 'Event Date\r'),
(128, '8-K12B/A', 'Amendment to Form 8-K12B', 'Event Date\r'),
(129, '8-K12G3', 'Notification that a class of securities of successor issuer is deemed to be registered pursuant to Section 12(g)', 'Event Date\r'),
(130, '8-K12G3/A', 'Amendment to Form 8-K12G3', 'Event Date\r'),
(131, '8-K15D5', 'Notification of assumption of duty to report by successor issue under Section 15(d)', 'Event Date\r'),
(132, '8-K15D5/A', 'Amendment to Form 8-K15D5', 'Event Date\r'),
(133, 'ABS-15G', '', 'Event Date\r'),
(134, 'ABS-15G/A', 'Amendment to Form ABS-15G', 'Event Date\r'),
(135, 'ANNLRPT', 'Periodic Development Bank filing, submitted annually', 'Period End\r'),
(136, 'ANNLRPT/A', 'Amendment to Form ANNLRPT', 'Period End\r'),
(137, 'APP WD', 'Withdrawal of an application for exemptive or other relief from the federal securities laws', 'Event Date\r'),
(138, 'APP WD/A', 'Amendment to Form APP WD', 'Event Date\r'),
(139, 'ARS', 'Annual report to security holders', 'Period End\r'),
(140, 'ARS/A', 'Amendment to Form ARS', 'Period End\r'),
(141, 'AW', 'Withdrawal of amendment to a registration statement filed under the Securities Act', 'Event Date\r'),
(142, 'AW WD', 'Withdrawal of a request for withdrawal of an amendment to a registration statement', 'Event Date\r'),
(143, 'CB', 'Notification form filed in connection with certain tender offers, business combinations and rights offerings, in which the subject company is a foreign private issuer of which less than 10% of its securities are held by U.S. persons', 'Event Date\r'),
(144, 'CB/A', 'Amendment to Form CB', 'Event Date\r'),
(145, 'CORRESP', 'A correspondence can be sent as a document with another submission type or can be sent as a separate submission', 'Event Date\r'),
(146, 'DEF 14A', 'Definitive proxy statements', 'Event Date\r'),
(147, 'DEF 14C', 'Definitive information statements', 'Event Date\r'),
(148, 'DEFA14A', 'Additional definitive proxy soliciting materials and Rule 14(a)(12) materials', 'Event Date\r'),
(149, 'DEFA14C', 'Definitive additional information statement materials including Rule 14(a)(12) material', 'Event Date\r'),
(150, 'DEFC14A', 'Definitive proxy statement in connection with contested solicitations', 'Event Date\r'),
(151, 'DEFC14C', 'Definitive information statement - contested solicitations', 'Event Date\r'),
(152, 'DEFM14A', 'Definitive proxy statement relating to merger or acquisition', 'Event Date\r'),
(153, 'DEFM14C', 'Definitive information statement relating to merger or acquisition', 'Event Date\r'),
(154, 'DEFN14A', 'Definitive proxy statement filed by non management', 'Event Date\r'),
(155, 'DEFR14A', 'Definitive revised proxy soliciting materials', 'Event Date\r'),
(156, 'DEFR14C', 'Definitive revised information statement materials', 'Event Date\r'),
(157, 'DEL AM', 'Separately filed delaying amendment under Securities Act Rule 473 to delay effectiveness of a 1933 Act registration statement', 'Event Date\r'),
(158, 'DFAN14A', 'Definitive additional proxy soliciting materials filed by non-management including Rule 14(a)(12) material', 'Event Date\r'),
(159, 'DFRN14A', 'Revised definitive proxy statement filed by nonmanagement', 'Event Date\r'),
(160, 'DRS', 'Draft Registration Statement', 'Event Date\r'),
(161, 'DRS/A', 'Amended Draft Registration Statement', 'Event Date\r'),
(162, 'DRSLTR', 'Correspondence Related to Draft Registration Statements', 'Event Date\r'),
(163, 'DSTRBRPT', 'Distribution of primary obligations Development Bank report', 'Event Date\r'),
(164, 'DSTRBRPT/A', 'Amendment to Form DSTRBRPT', 'Event Date\r'),
(165, 'F-1', 'Registration statement for securities of certain foreign private issuers', 'Event Date\r'),
(166, 'F-1/A', 'Amendment to Form F-1', 'Event Date\r'),
(167, 'F-10', 'Registration statement for securities of certain Canadian issuers under the Securities Act of 1933', 'Event Date\r'),
(168, 'F-10/A', 'Amendment to Form F-10', 'Event Date\r'),
(169, 'F-10EF', 'Auto effective registration statement for securities of certain Canadian issuers under the Securities Act of 1933', 'Event Date\r'),
(170, 'F-10POS', 'Post-effective amendment to a F-10EF registration', 'Event Date\r'),
(171, 'F-1MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective registration statement filed on Form F-1', 'Event Date\r'),
(172, 'F-3', 'Registration statement for specified transactions by certain foreign private issuers', 'Event Date\r'),
(173, 'F-3/A', 'Amendment to Form F-3', 'Event Date\r'),
(174, 'F-3ASR', 'Automatic shelf registration statement of securities of well-known seasoned issuers', 'Event Date\r'),
(175, 'F-3D', 'Registration statement for dividend or interest reinvestment plan securities of foreign private issuers', 'Event Date\r'),
(176, 'F-3DPOS', 'Post-Effective amendment to a F-3D registration', 'Event Date\r'),
(177, 'F-3MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective registration statement filed on Form F-3', 'Event Date\r'),
(178, 'F-4', 'Registration statement for securities issued by foreign private issuers in certain business combination transactions', 'Event Date\r'),
(179, 'F-4 POS', 'Post-effective amendment to a F-4EF registration', 'Event Date\r'),
(180, 'F-4/A', 'Amendment to Form F-4', 'Event Date\r'),
(181, 'F-4EF', 'Auto effective registration statement for securities by certain foreign private issuers in connection with certain business combination transactions', 'Event Date\r'),
(182, 'F-4MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective registration statement filed on Form F-4', 'Event Date\r'),
(183, 'F-6', 'Registration statement for American Depositary Receipts representing securities of certain foreign private issuers', 'Event Date\r'),
(184, 'F-6 EF', 'Auto effective registration statement for American Depositary Receipts representing securities of certain foreign private issuers', 'Event Date\r'),
(185, 'F-6 POS', 'Post-effective amendment to a F-6EF registration', 'Event Date\r'),
(186, 'F-6/A', 'Amendment to Form F-6', 'Event Date\r'),
(187, 'F-7', 'Registration statement for securities of certain Canadian issuers offered for cash upon the exercise of rights granted to existing security holders under the Securities Act of 1933', 'Event Date\r'),
(188, 'F-7 POS', 'Post-effective amendment to a F-7 registration', 'Event Date\r'),
(189, 'F-7/A', 'Amendment to Form F-7', 'Event Date\r'),
(190, 'F-8', 'Registration statement for securities of certain Canadian issuers to be issued in exchange offers or a business combination under the Securities Act of 1933', 'Event Date\r'),
(191, 'F-8 POS', 'Post-effective amendment to a F-8 registration', 'Event Date\r'),
(192, 'F-8/A', 'Amendment to Form F-8', 'Event Date\r'),
(193, 'F-80', 'Registration of securities of certain Canadian issuers to be issued in exchange offers or a business combination under the Securities Act of 1933', 'Event Date\r'),
(194, 'F-80/A', 'Amendment to Form F-80', 'Event Date\r'),
(195, 'F-80POS', 'Post-effective amendment to a F-80 registration', 'Event Date\r'),
(196, 'F-9', 'Registration of securities of certain investment grade debt or investment grade preferred securities of certain Canadian issuers under the Securities Act of 1933', 'Event Date\r'),
(197, 'F-9 EF', 'Auto effective registration of securities of certain investment grade debt or investment grade preferred securities of certain Canadian issuers under the Securities Act of 1933', 'Event Date\r'),
(198, 'F-9 POS', 'Post-effective amendment to a F-9EF registration', 'Event Date\r'),
(199, 'F-9/A', 'Amendment to Form F-9', 'Event Date\r'),
(200, 'F-N', 'Notification of the appointment of an agent for service by certain foreign institutions', 'Event Date\r'),
(201, 'F-N/A', 'Amendment to Form F-N', 'Event Date\r'),
(202, 'FWP', 'Filing under Securities Act Rules 163/433 of free writing prospectuses', 'Event Date\r'),
(203, 'F-X', 'For appointment of agent for service of process by issuers registering securities', 'Event Date\r'),
(204, 'F-X/A', 'Amendment to Form F-X', 'Event Date\r'),
(205, 'IRANNOTICE', 'Disclosures relating to sanctionable activities', 'Period End\r'),
(206, 'MODULE', 'A unit of information to be included in more than one filing and that is stored permanently on EDGAR', 'Event Date\r'),
(207, 'N-1', 'Initial registration statement filed on Form N-1 for open-end management investment companies', 'Event Date\r'),
(208, 'N-1/A', 'Amendment to Form N-1', 'Event Date\r'),
(209, 'N-14', 'Initial registration statement filed on Form N14 for open-end investment company, including those filed with automatic effectiveness under Rule 488 (business combinations)', 'Event Date\r'),
(210, 'N-14 8C', 'Initial registration statement filed on Form N14 by closed-end investment company (business combinations)', 'Event Date\r'),
(211, 'N-14 8C/A', 'Amendment to Form N-14 8C', 'Event Date\r'),
(212, 'N-14/A', 'Amendment to Form N-14', 'Event Date\r'),
(213, 'N-14MEF', 'A new registration statement filed on Form N14 by closed end investment companies filed under Securities Act Rule 462(b) of up to an additional 20% of securities for an offering that was registered on Form N-14', 'Event Date\r'),
(214, 'N-18F1', 'Initial notification of election pursuant to Rule 18f-1 filed on Form N-18F-1', 'Event Date\r'),
(215, 'N-18F1/A', 'Amendment to Form N-18F1', 'Event Date\r'),
(216, 'N-1A', 'Initial registration statement filed on Form N1A for open-end management investment companies', 'Event Date\r'),
(217, 'N-1A/A', 'Amendment to Form N-1A', 'Event Date\r'),
(218, 'N-2', 'Initial filing of a registration statement on Form N-2 for closed-end investment companies', 'Event Date\r'),
(219, 'N-2/A', 'Amendment to Form N-2', 'Event Date\r'),
(220, 'N-23C-2', 'Notice by closed-end investment companies of intention to call or redeem their own securities under Investment Company Act Rule 23c-2', 'Event Date\r'),
(221, 'N-23C-2/A', 'Amendment to Form N-23C-2', 'Event Date\r'),
(222, 'N-23C3A', 'Notification of periodic repurchase offer Filed pursuant to Rule 23c-3(b) only', 'Event Date\r'),
(223, 'N-23C3A/A', 'Amendment to Form N-23C3A', 'Event Date\r'),
(224, 'N-23C3B', 'Filing pursuant to Rule 23c-3(c) only on Form N-23C-3', 'Event Date\r'),
(225, 'N-23C3B/A', 'Amendment to Form N-23C3B', 'Event Date\r'),
(226, 'N-23C3C', 'Filing pursuant to Rule 23c-3(b) and (c) on Form N-23C-3', 'Event Date\r'),
(227, 'N-23C3C/A', 'Amendment to Form N-23C3C', 'Event Date\r'),
(228, 'N-27D-1', 'Accounting for segregated trust accounts on Form N-27D-1', 'Event Date\r'),
(229, 'N-27D-1/A', 'Amendment to Form N-27D-1', 'Event Date\r'),
(230, 'N-2MEF', 'A new registration statement on Form N-2 filed under Securities Act Rule 462(b) by closed-end investment companies of up to an additional 20% of securities for an offering that was registered on Form N-2', 'Event Date\r'),
(231, 'N-3', 'Initial registration statement on Form N-3 for separate accounts (management investment companies)', 'Event Date\r'),
(232, 'N-3/A', 'Amendment to Form N-3', 'Event Date\r'),
(233, 'N-30B-2', 'Periodic and interim reports mailed to investment company shareholders (other than annual and semi-annual reports mailed to shareholders pursuant to Rule 30e-1)', 'Event Date\r'),
(234, 'N-30D', 'Initial annual and semi-annual reports mailed to investment company shareholders pursuant to Rule 30e-1 (other than those required to be submitted as part of Form NCSR)', 'Event Date\r'),
(235, 'N-30D/A', 'Amendment to Form N-30D', 'Event Date\r'),
(236, 'N-4', 'Initial registration statement on Form N-4 for separate accounts (unit investment trusts)', 'Event Date\r'),
(237, 'N-4/A', 'Amendment to Form N-4', 'Event Date\r'),
(238, 'N-5', 'Registration statement for small business investment companies', 'Event Date\r'),
(239, 'N-5/A', 'Amendment to Form N-5', 'Event Date\r'),
(240, 'N-54A', 'Notification of withdrawal by business development companies filed on Form N-54A', 'Event Date\r'),
(241, 'N-54A/A', 'Amendment to Form N-54A', 'Event Date\r'),
(242, 'N-54C', 'Notification of withdrawal by business development companies filed on Form N-54C', 'Event Date\r'),
(243, 'N-54C/A', 'Amendment to Form N-54C', 'Event Date\r'),
(244, 'N-6', 'Registration statement for separate accounts (unit investment trusts)', 'Event Date\r'),
(245, 'N-6/A', 'Amendment to Form N-6', 'Event Date\r'),
(246, 'N-6F', 'Notice of intent by business development companies to elect to be subject to Sections 55 through 65 of the 1940 Act filed on Form N-6F', 'Event Date\r'),
(247, 'N-6F/A', 'Amendment to Form N-6F', 'Event Date\r'),
(248, 'N-8A', 'Initial notification of registration under Section 8(a) filed on Form N-8A', 'Event Date\r'),
(249, 'N-8A/A', 'Amendment to Form N-8A', 'Event Date\r'),
(250, 'N-8B-2', 'Initial registration statement for unit investment trusts filed on Form N-8B-2', 'Event Date\r'),
(251, 'N-8B-2/A', 'Amendment to Form N-8B-2', 'Event Date\r'),
(252, 'N-8B-3', 'Initial registration statement for periodic payment plans filed on Form N-8B-3', 'Event Date\r'),
(253, 'N-8B-3/A', 'Amendment to Form N-8B-3', 'Event Date\r'),
(254, 'N-8B-4', 'Initial registration statement for face-amount certificate companies filed on Form N-8B-4', 'Event Date\r'),
(255, 'N-8B-4/A', 'Amendment to Form N-8B-4', 'Event Date\r'),
(256, 'N-8F', 'Application for deregistration made on Form N-8F', 'Event Date\r'),
(257, 'N-8F/A', 'Amendment to Form N-8F', 'Event Date\r'),
(258, 'N-CSR', 'Certified annual shareholder report of registered management investment companies filed on Form N-CSR', 'Period End\r'),
(259, 'N-CSR/A', 'Amendment to Form N-CSR', 'Period End\r'),
(260, 'N-CSRS', 'Certified semi-annual shareholder report of registered management investment companies filed on Form N-CSR', 'Period End\r'),
(261, 'N-CSRS/A', 'Amendment to Form N-CSRS', 'Period End\r'),
(262, 'N-PX', 'Annual Report of Proxy Voting Record of Registered Management Investment Companies filed on Form N-PX', 'Event Date\r'),
(263, 'N-PX/A', 'Amendment to Form N-PX', 'Event Date\r'),
(264, 'N-PX-CR', 'Annual Form N-PX Combination Report filed by institutional managers', 'Period End\r'),
(265, 'N-PX-CR/A', 'Amendment to Form N-PX-CR', 'Period End\r'),
(266, 'N-PX-FM', 'Annual Report of Proxy Voting Record of Registered Management Investment Companies that includes proxy votes institutional managers', 'Period End\r'),
(267, 'N-PX-FM/A', 'Amendment to Form N-PX-FM', 'Period End\r'),
(268, 'N-PX-NT', 'Annual Form N-PX Notice filed by institutional managers', 'Period End\r'),
(269, 'N-PX-NT/A', 'Amendment to Form N-PX-NT', 'Period End\r'),
(270, 'N-PX-VR', 'Annual Form N-PX Voting Report filed by institutional managers', 'Period End\r'),
(271, 'N-PX-VR/A', 'Amendment to Form N-PX-VR', 'Period End\r'),
(272, 'N-Q', 'Quarterly Schedule of Portfolio Holdings of Registered Management Investment Company filed on Form N-Q', 'Period End\r'),
(273, 'N-Q/A', 'Amendment to Form N-Q', 'Period End\r'),
(274, 'NSAR-A', 'Semi-annual report for management companies filed on Form N-SAR', 'Period End\r'),
(275, 'NSAR-A/A', 'Amendment to Form NSAR-A', 'Period End\r'),
(276, 'NSAR-AT', 'Transitional semi-annual report filed on Form N-SAR', 'Period End\r'),
(277, 'NSAR-AT/A', 'Amendment to Form NSAR-AT', 'Period End\r'),
(278, 'NSAR-B', 'Annual report for management companies filed on Form N-SAR', 'Period End\r'),
(279, 'NSAR-B/A', 'Amendment to Form NSAR-B', 'Period End\r'),
(280, 'NSAR-BT', 'Transitional annual report filed on Form N-SAR', 'Period End\r'),
(281, 'NSAR-BT/A', 'Amendment to Form NSAR-BT', 'Period End\r'),
(282, 'NSAR-U', 'Annual report for unit investment trusts filed on Form N-SAR', 'Period End\r'),
(283, 'NSAR-U/A', 'Amendment to Form NSAR-U', 'Period End\r'),
(284, 'NT 10-D', 'Notice under Rule 12b25 of inability to timely file all or part of a Form 10-D', 'Period End\r'),
(285, 'NT 10D/A', 'Amendment to Form NT-10D', 'Period End\r'),
(286, 'NT 10-K', 'Notice under Rule 12b25 of inability to timely file all or part of a Form 10-K, 10-KSB, or 10KT', 'Period End\r'),
(287, 'NT 10-K/A', 'Amendment to Form NT-10-K', 'Period End\r'),
(288, 'NT 10-Q', 'Notice under Rule 12b25 of inability to timely file all or part of a Form 10-Q or 10-QSB', 'Period End\r'),
(289, 'NT 10-Q/A', 'Amendment to Form NT-10-Q', 'Period End\r'),
(290, 'NT 11-K', 'Notice under Rule 12b25 of inability to timely file all or part of a Form 11-K', 'Period End\r'),
(291, 'NT 11-K/A', 'Amendment to Form NT-11-K', 'Period End\r'),
(292, 'NT 15D2', 'Notice under Rule 12b25 of inability to timely file a special report pursuant to Section 15d-2', 'Period End\r'),
(293, 'NT 15D2/A', 'Amendment to Form NT-15D2', 'Period End\r'),
(294, 'NT 20-F', 'Notice under Rule 12b25 of inability to timely file all or part of an annual report of Form 20-F', 'Period End\r'),
(295, 'NT 20-F/A', 'Amendment to Form NT-20-F', 'Period End\r'),
(296, 'NT-NCSR', 'Notice under Exchange Act Rule 12b-25 of inability to timely file Form N-CSR (annual or semi-annual report)', 'Period End\r'),
(297, 'NT-NCSR/A', 'Amendment to Form NT-NCSR', 'Period End\r'),
(298, 'NT-NSAR', 'Notice under Exchange Act Rule 12b-25 of inability to timely file Form N-SAR', 'Period End\r'),
(299, 'NT-NSAR/A', 'Amendment to Form NT-NSAR', 'Period End\r'),
(300, 'POS 462B', 'Post-effective amendment to Securities Act Rule 462(b) registration statement', 'Event Date\r'),
(301, 'POS 462C', 'Post-effective amendment to a registration statement filed under Rule 462(c)', 'Event Date\r'),
(302, 'POS 8C', 'Post-effective amendment filed under the 1933 Act only or under both the 1933 and 1940 Acts pursuant to Section 8(c) of the 1933 Act by closed-end investment companies (this filing cannot be submitted as a 1940 Act only filing)', 'Event Date\r'),
(303, 'POS AM', 'Post-effective amendment to a registration statement that is not immediately effective upon filing', 'Event Date\r'),
(304, 'POS AMI', 'Post-effective amendment (for filings made under the 1940 Act only)', 'Event Date\r'),
(305, 'POS EX', 'Post-effective amendment filed solely to add exhibits to a registration statement', 'Event Date\r'),
(306, 'POSASR', 'Post-effective amendment to an automatic shelf registration statement on Form S-3ASR or Form F-3ASR', 'Event Date\r'),
(307, 'PRE 14A', 'Preliminary proxy statement not related to a contested matter or merger/acquisition', 'Event Date\r'),
(308, 'PRE 14C', 'Preliminary information statement not related to a contested matter or merger/acquisition', 'Event Date\r'),
(309, 'PREC14A', 'Preliminary proxy statement in connection with contested solicitations', 'Event Date\r'),
(310, 'PREC14C', 'Preliminary information statements - contested solicitations', 'Event Date\r'),
(311, 'PREM14A', 'Preliminary proxy statements relating to merger or acquisition', 'Event Date\r'),
(312, 'PREM14C', 'Preliminary information statements relating to merger or acquisition', 'Event Date\r'),
(313, 'PREN14A', 'Preliminary proxy statement filed by nonmanagemen', 'Event Date\r'),
(314, 'PRER14A', 'Preliminary revised proxy soliciting materials', 'Event Date\r'),
(315, 'PRER14C', 'Preliminary revised information statements', 'Event Date\r'),
(316, 'PRRN14A', 'Revised preliminary proxy statement filed by non-management', 'Event Date\r'),
(317, 'PX14A6G', 'Notice of exempt solicitation', 'Event Date\r'),
(318, 'PX14A6N', 'Notice of exempt solicitation for the purpose of determining whether to solicit proxies, consents, or authorizations in opposition to a proposed rollup transaction filed pursuant to Rule 14a6(g) of the Securities Exchange Act of 1934', 'Event Date\r'),
(319, 'QRTLYRPT', 'Periodic Development Bank filing, submitted quarterly', 'Event Date\r'),
(320, 'QRTLYRPT/A', 'Amendment to Form QRTLYRPT', 'Event Date\r'),
(321, 'RW', 'Registration Withdrawal Request', 'Event Date\r'),
(322, 'RW WD', 'Withdrawal of a Registration Withdrawal Request', 'Event Date\r'),
(323, 'S-1', 'General form of registration statement for all companies including face-amount certificate companies', 'Event Date\r'),
(324, 'S-1/A', 'Amendment to Form S-1', 'Event Date\r'),
(325, 'S-11', 'Registration statement for securities to be issued by real estate companies', 'Event Date\r'),
(326, 'S-11/A', 'Amendment to Form S-11', 'Event Date\r'),
(327, 'S-11MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective registration statement filed on Form S-11', 'Event Date\r'),
(328, 'S-1MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective registration statement filed on Form S-1', 'Event Date\r'),
(329, 'S-20', 'Registration statement for standardized options', 'Event Date\r'),
(330, 'S-20/A', 'Amendment to Form S-20', 'Event Date\r'),
(331, 'S-3', 'Registration statement for specified transactions by certain issuers', 'Event Date\r'),
(332, 'S-3 MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective registration statement filed on Form S-3', 'Event Date\r'),
(333, 'S-3/A', 'Amendment to Form S-3', 'Event Date\r'),
(334, 'S-3ASR', 'Automatic shelf registration statement of securities of well-known seasoned issuers', 'Event Date\r'),
(335, 'S-3D', 'Automatically effective registration statement for securities issued pursuant to dividend or interest reinvestment plans', 'Event Date\r'),
(336, 'S-3DPOS', 'Post-effective amendment to a S-3D registration statement', 'Event Date\r'),
(337, 'S-4', 'Registration of securities issued in business combination transactions', 'Event Date\r'),
(338, 'S-4 POS', 'Post-effective amendment to a S-4EF registration statement', 'Event Date\r'),
(339, 'S-4/A', 'Amendment to Form S-4', 'Event Date\r'),
(340, 'S-4EF', 'Auto effective registration statement for securities issued in connection with the formation of a bank or savings and loan holding company in compliance with General Instruction G', 'Event Date\r'),
(341, 'S-4MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective registration statement filed on Form S-4', 'Event Date\r'),
(342, 'S-6', 'Initial registration statement filed on Form S-6 for unit investment trusts', 'Event Date\r'),
(343, 'S-6/A', 'Amendment to Form S-6', 'Event Date\r'),
(344, 'S-8', 'Initial registration statement for securities to be offered to employees pursuant to employee benefit plans', 'Event Date\r'),
(345, 'S-8 POS', 'Post-effective amendment to a S-8 registration statement', 'Event Date\r'),
(346, 'S-B', 'Registration statement for securities of foreign governments and subdivisions thereof under the Securities Act of 1933 (Schedule B)', 'Event Date\r'),
(347, 'S-B MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective registration statement filed on Form S-B', 'Event Date\r'),
(348, 'S-B/A', 'Amendment to Form S-B', 'Event Date\r'),
(349, 'SC 13E1', 'Schedule 13-E1 statement of issuer required by Rule 13e-1', 'Event Date\r'),
(350, 'SC 13E1/A', 'Amendment to Form SC 13E1', 'Event Date\r'),
(351, 'SC 13E3', 'Schedule filed to report going private transactions', 'Event Date\r'),
(352, 'SC 13E3/A', 'Amendment to Form SC 13E3', 'Event Date\r'),
(353, 'SC 13G', 'Schedule filed to report acquisition of beneficial ownership of 5% or more of a class of equity securities by passive investors and certain institutions', 'Event Date\r'),
(354, 'SC 13G/A', 'Amendment to Form SC 13G', 'Event Date\r'),
(355, 'SC 14D9', 'Tender offer solicitation / recommendation statements filed under Rule 14d-9', 'Event Date\r'),
(356, 'SC 14D9/A', 'Amendment to Form SC 14D9', 'Event Date\r'),
(357, 'SC 14F1', 'Statement regarding change in majority of directors pursuant to Rule 14f-1', 'Event Date\r'),
(358, 'SC 14F1/A', 'Amendment to Form SC 14F1', 'Event Date\r'),
(359, 'SC 14N', '', 'Event Date\r'),
(360, 'SC 14N/A', 'Amendment to Form SC 14N', 'Event Date\r'),
(361, 'SC 14N-S', '', 'Event Date\r'),
(362, 'SC 14N-S/A', 'Amendment to Form SC 14N-S', 'Event Date\r'),
(363, 'SC TO-C', 'Written communication relating to an issuer or third party tender offer', 'Event Date\r'),
(364, 'SC TO-I', 'Issuer tender offer statement', 'Event Date\r'),
(365, 'SC TO-I/A', 'Amendment to Form SC TO-I', 'Event Date\r'),
(366, 'SC TO-T', 'Third party tender offer statement', 'Event Date\r'),
(367, 'SC TO-T/A', 'Amendment to Form SC TO-T', 'Event Date\r'),
(368, 'SC-13D', 'Schedule filed to report acquisition of beneficial ownership of 5% or more of a class of equity securities', 'Event Date\r'),
(369, 'SC-13D/A', 'Amendment to Form SC 13D', 'Event Date\r'),
(370, 'SC13E4F', 'Issuer tender offer statement filed pursuant to Rule 13(e)(4) by foreign issuers', 'Event Date\r'),
(371, 'SC13E4F/A', 'Amendment to Form SC13E4F', 'Event Date\r'),
(372, 'SC14D1F', 'Third party tender offer statement filed pursuant to Rule 14d-1(b) by foreign issuers', 'Event Date\r'),
(373, 'SC14D1F/A', 'Amendment to Form SC14D1F', 'Event Date\r'),
(374, 'SC14D9C', 'Written communication by the subject company relating to a third party tender offer', 'Event Date\r'),
(375, 'SC14D9F', 'Solicitation/recommendation statement pursuant to Section 14(d)(4) of the Securities Exchange Act of 1934 and Rules 14d-1(b) and 14e-2(c) by foreign issuers', 'Event Date\r'),
(376, 'SC14D9F/A', 'Amendment to Form SC14D9F', 'Event Date\r'),
(377, 'SD', 'Specialized Disclosure Report filed pursuant to Sections 1502 and 1504 of the Dodd-Frank Wall Street Reform and Consumer Protection Act relating to the use of conflict minerals (Rule 13p-1) and the disclosure of payments by resource extraction issuers (Rule 13q-1)', 'Event Date\r'),
(378, 'SD/A', 'Amendment to Form SD', 'Event Date\r'),
(379, 'SEGMENT', 'A unit of information to be included in more than one filing and that is stored temporarily on EDGAR', 'Event Date\r'),
(380, 'SH-ER', 'Weekly Form SH Entries Report Filed by Institutional Investment Managers', 'Event Date\r'),
(381, 'SH-ER/A', 'Amendment to Form SH-ER', 'Event Date\r'),
(382, 'SH-NT', 'Weekly Form SH Notice Report Filed by Institutional Investment Managers', 'Event Date\r'),
(383, 'SH-NT/A', 'Amendment to Form SH-NT', 'Event Date\r'),
(384, 'SP 15D2', 'Special Financial Report filed under Rule 15d-2', 'Event Date\r'),
(385, 'SP 15D2/A', 'Amendment to Form SP 15D2', 'Event Date\r'),
(386, 'SUPPL', 'Voluntary supplemental material filed pursuant to Section 11(a) of the Securities Act of 1933 by foreign issuers', 'Event Date\r'),
(387, 'T3', 'Initial application for qualification of trust indentures', 'Event Date\r'),
(388, 'T-3/A', 'Amendment to Form T-3', 'Event Date\r'),
(389, 'T-6', 'Application for determination of eligibility of a foreign person to act as institutional trustee filed pursuant to Section 310(a)(1) of the Trust Indenture Act of 1939', 'Event Date\r'),
(390, 'T-6/A', 'Amendment to Form T-6', 'Event Date\r'),
(391, 'UNDER', 'Initial undertaking to file reports', 'Event Date\r'),
(392, 'UNDER/A', 'Amendment to Form UNDER', 'Event Date');

-- --------------------------------------------------------

--
-- Table structure for table `Log`
--

CREATE TABLE `Log` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `entity` varchar(50) CHARACTER SET latin1 NOT NULL,
  `action` varchar(30) CHARACTER SET latin1 NOT NULL,
  `actionDateTime` datetime NOT NULL,
  `actionBy` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=113 ;

--
-- Dumping data for table `Log`
--

INSERT INTO `Log` (`id`, `entity`, `action`, `actionDateTime`, `actionBy`) VALUES
(79, 'User', 'Created', '2013-12-03 14:47:14', 4),
(99, 'Administrator', 'Modified', '2013-12-04 11:08:15', 4),
(100, 'Customer User', 'Modified', '2013-12-04 12:30:11', 20),
(101, 'User', 'Modified', '2013-12-04 12:30:38', 4),
(102, 'User', 'Modified', '2013-12-04 12:30:59', 4),
(103, 'User', 'Modified', '2013-12-04 14:47:12', 4),
(104, 'User', 'Deleted', '2013-12-04 14:47:37', 4),
(105, 'User', 'Modified', '2013-12-04 14:59:41', 4),
(106, 'User', 'Created', '2013-12-09 16:42:22', 4),
(107, 'User', 'Deleted', '2013-12-09 16:42:34', 4),
(108, 'Super User', 'Created', '2013-12-11 13:52:48', 4),
(109, 'Company User', 'Created', '2013-12-12 12:48:26', 4),
(110, 'Company User', 'Created', '2013-12-12 12:49:06', 4),
(111, 'Company User', 'Created', '2013-12-12 15:22:49', 4),
(112, 'Company User', 'Created', '2013-12-12 15:23:21', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Project`
--

CREATE TABLE `Project` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `company` int(10) NOT NULL,
  `year` int(11) NOT NULL,
  `formType` varchar(10) NOT NULL,
  `jobNo` varchar(100) NOT NULL,
  `deadlineDate` varchar(100) NOT NULL,
  `createdOn` datetime NOT NULL,
  `createdBy` int(11) NOT NULL,
  `modifiedOn` datetime DEFAULT NULL,
  `modifiedBy` int(20) DEFAULT NULL,
  `lifeCycleState` int(3) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `version` decimal(10,0) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `userCount` int(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=59 ;

--
-- Dumping data for table `Project`
--

INSERT INTO `Project` (`id`, `company`, `year`, `formType`, `jobNo`, `deadlineDate`, `createdOn`, `createdBy`, `modifiedOn`, `modifiedBy`, `lifeCycleState`, `action`, `version`, `description`, `userCount`) VALUES
(54, 101, 2012, '18', 'Form 18_2013-12-31', 'Wed Apr 16 2014 00:00:00 GMT-0400 (EDT)', '2013-12-17 18:27:04', 4, '2013-12-17 18:27:04', 4, 1, 'Created', 1, '', 0),
(58, 101, 2010, '13F-HR/A', 'Form 13F-HR/A_2013-12-30', 'Fri Dec 27 2013 00:00:00 GMT-0500 (EST)', '2013-12-18 13:45:45', 4, '2013-12-18 13:45:45', 4, 1, 'Created', 1, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ProjectUser`
--

CREATE TABLE `ProjectUser` (
  `projectId` int(100) NOT NULL,
  `userId` int(100) NOT NULL,
  KEY `fk_proj_projuser` (`projectId`),
  KEY `fk_user_projuser` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ProjectUser`
--

INSERT INTO `ProjectUser` (`projectId`, `userId`) VALUES
(54, 3),
(58, 23);

--
-- Triggers `ProjectUser`
--
DROP TRIGGER IF EXISTS `afterAddUsertoProject`;
DELIMITER //
CREATE TRIGGER `afterAddUsertoProject` AFTER INSERT ON `ProjectUser`
 FOR EACH ROW BEGIN
        UPDATE Edgar.Project P
        JOIN ProjectUser PU ON
        P.id = PU.projectId
        SET P.userCount = P.userCount + 1
        WHERE P.id = NEW.projectId;
END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `customerId` int(100) NOT NULL,
  `name` varchar(70) NOT NULL,
  `password` varchar(70) NOT NULL,
  `nameFirst` varchar(25) NOT NULL,
  `nameLast` varchar(25) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `domain` int(1) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedOn` datetime DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `modifiedBy` int(11) DEFAULT NULL,
  `isDeleted` binary(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `customerId`, `name`, `password`, `nameFirst`, `nameLast`, `phone`, `domain`, `createdOn`, `modifiedOn`, `createdBy`, `modifiedBy`, `isDeleted`) VALUES
(2, 100, 'modikejal10@gmail.com', '6AE6A2378072794D0855FEC1D06A1E85B3C1E167', 'Mathew', 'Rocher', '2147483647', 4, '2013-11-21 20:18:13', '2013-11-27 16:58:04', 4, 20, '0'),
(3, 101, 'kejalmodi2013@gmail.com', '9359D7D7C9F2330FE38AAAC1B3B71ABFA34F855A', 'Shawn', 'Michael', '2147483647', 3, '2013-11-21 20:23:22', NULL, 4, NULL, '0'),
(4, 1, 'surabhi.mendiratta@gmail.com', 'E8D5421272C485DCB7F2A855A568F159B5DC3E62', 'Surabhi', 'Mendiratta', '2147483647', 1, '2013-11-21 20:25:27', '2013-12-03 17:55:11', 4, 4, '0'),
(5, 102, 'surabhi.mendiratta@gmail.com', 'F226588530945A1BCB550BFF50D7B05C7268D24A', 'Aaron', 'Hendrickson', '2147483647', 3, '2013-11-21 21:23:36', NULL, 4, NULL, '0'),
(6, 102, 'drosenfeld@qualityedgar.com', '89636749B2750C2DC6286AA38D994163E929FEF7', 'David', 'Rosenfeld', '2147483647', 3, '2013-11-21 21:25:58', NULL, 4, NULL, '0'),
(7, 1, 'abhishekkdesai@gmail.com', '49394C701A8D4E7E33469A698754855BB0AA77BB', 'Abhishek', 'Desai', '1234567891', 1, '2013-11-21 21:59:04', NULL, 4, NULL, '1'),
(8, 103, 'abhishekkdesai@gmail.com', '5E552ED81D692D28E8053F1A4E40541C0E4EA7F0', 'Abhishek', 'Desai', '732', 3, '2013-11-21 22:03:11', NULL, 4, NULL, '0'),
(10, 1, 'desaip05@gmail.com', 'C6CF4085589C483BD0BDDA8143FE92CA8A26914A', 'Michelle', 'Parker', '666', 2, '2013-11-26 20:58:57', '2013-12-04 11:10:06', 4, 4, '0'),
(11, 1, 'kkejal2013@gmail.com', 'E3ADBA4081129AD8D9E24A7F2BBB33E842F1D5EB', 'Joanne', 'Manning', '2147483647', 2, '2013-11-26 21:15:52', NULL, 4, NULL, '0'),
(12, 1, 'kejal.modi.11@gmail.com', '952D19F9BAE7EABD7ADA5A70429AFD71B4BB548B', 'Peter', 'Pan', '2147483647', 2, '2013-11-27 21:33:05', '2013-12-04 14:59:41', 4, 4, '0'),
(17, 1, 'surbhi.luvs.u@gmail.com', 'F94B202B769C5B80CE832E055BDA14691C53AE68', 'Mark', 'Mathews', '1119990111', 2, '2013-12-03 19:47:14', '2013-12-03 15:30:59', 4, 4, '1'),
(20, 100, 'Joanne.Manning@quantilus.com', '39B0C28FD03640FBCDCC66D4FBFA4B9102EC717C', 'Lisa', 'Ray', '6675543456', 3, '2013-12-11 18:52:48', NULL, 4, NULL, '0'),
(21, 100, 'surbhi.luvs.u@gmail.com', 'D2CDCAA201F48E1925EABE544628C62FE1556A7A', 'Pete', 'Grant', '7785326879', 4, '2013-12-12 17:48:26', NULL, 4, NULL, '0'),
(22, 100, 'harit.baveja@quantilus.com', '8B7517EE0844847BFC25DD53082798CF4EDAD057', 'Bob', 'Williams', '6674438790', 4, '2013-12-12 17:49:06', NULL, 4, NULL, '0'),
(23, 101, 'Yang.Chen@quantilus.com', '91BEC93B9AE3A17481805E099D1DFE5745B31785', 'Yang', 'Chen', '6677785433', 4, '2013-12-12 20:22:49', NULL, 4, NULL, '0'),
(24, 101, 'Parikshit.Desai@quantilus.com', '28FB26F9734D10BCCD0F663CA782CC4AE1D3E472', 'Parikshit', 'Desai', '7789864567', 4, '2013-12-12 20:23:21', NULL, 4, NULL, '0');

--
-- Triggers `User`
--
DROP TRIGGER IF EXISTS `afterAddUser`;
DELIMITER //
CREATE TRIGGER `afterAddUser` AFTER INSERT ON `User`
 FOR EACH ROW BEGIN

IF New.domain = 1 THEN

        INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Administrator", "Created", NOW(), New.createdBy);
ELSEIF New.domain = 2 THEN
	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("User", "Created", NOW(), New.createdBy);
ELSEIF New.domain = 3 THEN
	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Registrant Super User", "Created", NOW(), New.createdBy);
ELSE INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Registrant User", "Created", NOW(), New.createdBy);
END IF ;

END
//
DELIMITER ;
DROP TRIGGER IF EXISTS `afterModifyorDeleteUser`;
DELIMITER //
CREATE TRIGGER `afterModifyorDeleteUser` AFTER UPDATE ON `User`
 FOR EACH ROW BEGIN



IF New.domain=1 AND New.isDeleted = 0 THEN

        INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Administrator", "Modified", NOW(), New.modifiedBy);

END IF;



IF New.domain=1 AND New.isDeleted = 1 THEN

        INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Administrator", "Deleted", NOW(), New.modifiedBy);

END IF;



IF New.domain = 2 AND New.isDeleted = 1 THEN

INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("User", "Deleted", NOW(), New.modifiedBy);

END IF;





IF New.domain = 3 AND New.isDeleted = 1 THEN

INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Registrant Super User", "Deleted", NOW(), New.modifiedBy);

END IF;



IF New.domain = 4 AND New.isDeleted = 1 THEN

INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Registrant User", "Deleted", NOW(), New.modifiedBy);

END IF ;

IF New.domain = 2 AND New.isDeleted = 0 THEN

	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("User", "Modified", NOW(), New.modifiedBy);

END IF;



IF New.domain = 3 AND New.isDeleted = 0 THEN

	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Registrant Super User", "Modified", NOW(), New.modifiedBy);

END IF;





IF New.domain = 4 AND New.isDeleted = 0 THEN

	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Registrant User", "Modified", NOW(), New.modifiedBy);

END IF;



END
//
DELIMITER ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `FileProject`
--
ALTER TABLE `FileProject`
  ADD CONSTRAINT `fk_FileProject` FOREIGN KEY (`fileId`) REFERENCES `File` (`id`),
  ADD CONSTRAINT `fk_ProjectFile` FOREIGN KEY (`projectId`) REFERENCES `Project` (`id`);

--
-- Constraints for table `ProjectUser`
--
ALTER TABLE `ProjectUser`
  ADD CONSTRAINT `fk_proj_projuser` FOREIGN KEY (`projectId`) REFERENCES `Project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_projuser` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
