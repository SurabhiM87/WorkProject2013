-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 13, 2013 at 04:49 PM
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
(101, 'Walmart.Inc', 'Westbury, PorthWashington', NULL, 2147483647, '2147483647', '2147483647', 0, '0', 0),
(102, 'Moody National Reit', 'NewYork', '', 2147483647, '2147483647', '2147483647', 0, '0', 0),
(103, 'Desai & Desai Associates', 'Spring Hill Village', '', 2147483647, '2147483647', '2147483647', 0, '0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Files`
--

CREATE TABLE `Files` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `projectId` int(100) NOT NULL,
  `fileName` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `FormTypes`
--

CREATE TABLE `FormTypes` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `formType` varchar(10) NOT NULL,
  `formDescription` varchar(100) NOT NULL,
  `dateType` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=487 ;

--
-- Dumping data for table `FormTypes`
--

INSERT INTO `FormTypes` (`id`, `formType`, `formDescription`, `dateType`) VALUES
(1, '3', 'Initial statement of beneficial ownership of securities', 'Event Date\r'),
(2, '4', 'Statement of changes in beneficial ownership of securities', 'Event Date\r'),
(3, '5', 'Annual statement of changes in beneficial ownership of securities', 'Period End\r'),
(4, '15', 'Certification and notice of termination of registration under Section 12(g) or suspension of duty to', 'Event Date\r'),
(5, '18', 'Application for registration pursuant to Section 12(b) & (c) of the Securities Exchange Act of 1934', 'Event Date\r'),
(6, '25', 'Notification filed by issuer to voluntarily withdraw a class of securities from listing and registra', 'Event Date\r'),
(7, '144', 'Filing for proposed sale of securities under Rule 144', 'Event Date\r'),
(8, '425', 'Filing under Securities Act Rule 425 of certain prospectuses and communications in connection with b', 'Event Date\r'),
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
(46, '18-12B', 'Form for initial registration of securities of foreign governments or political subdivisions pursuan', 'Event Date\r'),
(47, '18-12B/A', 'Amendment to Form 18-12B', 'Event Date\r'),
(48, '18-12G', 'Form for initial registration of securities of foreign governments or political subdivisions thereof', 'Event Date\r'),
(49, '18-12G/A', 'Amendment to Form 18-12G', 'Event Date\r'),
(50, '18-K', 'Annual report for foreign governments and political subdivisions', 'Period End\r'),
(51, '18-K/A', 'Amendment to Form 18-K', 'Period End\r'),
(52, '1-A', 'Offering Statement under Regulation A', 'Event Date\r'),
(53, '1-E', 'Notification under Regulation E by small business investment companies and business development comp', 'Event Date\r'),
(54, '1-E AD', 'AD/A Sales material filed pursuant to Rule 607 under Regulation E', 'Event Date\r'),
(55, '1-E AD/A', 'Amendment to Form 1-E AD', 'Event Date\r'),
(56, '1-E/A', 'Amendment to Form 1-E', 'Event Date\r'),
(57, '1-N', 'Form and amendments for notice of registration as a national securities exchange for the sole purpos', 'Event Date\r'),
(58, '20-F', 'Annual and transition report of foreign private issuers  pursuant to sections 13 or 15(d)', 'Event Date\r'),
(59, '20-F/A', 'Amendment to Form 20-F', 'Event Date\r'),
(60, '20FR12B', 'Form for initial registration of a class of securities of foreign private issuers pursuant to Sectio', 'Event Date\r'),
(61, '20FR12B/A', 'Amendment to Form 20FR12B', 'Event Date\r'),
(62, '20FR12G', 'Form for initial registration of a class of securities of foreign private issuers pursuant to Sectio', 'Event Date\r'),
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
(74, '40-17F1', 'Initial certificate of accounting of securities and similar investments in the custody of management', 'Event Date\r'),
(75, '40-17F1/A', 'Amendment to Form 40-17F1', 'Event Date\r'),
(76, '40-17F2', 'Initial certificate of accounting of securities and similar investments in the custody of management', 'Event Date\r'),
(77, '40-17F2/A', 'Amendment to Form 40-17F2', 'Event Date\r'),
(78, '40-17G', 'Fidelity bond filed pursuant to Rule 17g1(g)(1) of the Investment Company Act of 1940', 'Event Date\r'),
(79, '40-17G/A', 'Amendment to Form 40-17G', 'Event Date\r'),
(80, '40-17GCS', 'Filings of claim or settlement pursuant to Rule 17g-1(g)(1)(2) or (3) of the Investment Company Act ', 'Event Date\r'),
(81, '40-17GCS/A', 'Amendment to Form 40-17GCS', 'Event Date\r'),
(82, '40-24B2', 'Filing of sales literature pursuant to Rule 24b2 under the Investment Company Act of 1940', 'Event Date\r'),
(83, '40-24B2/A', 'Amendment to Form 40-24B2', 'Event Date\r'),
(84, '40-33', 'Copies of all stockholder derivative actions filed with a court against an investment company or an ', 'Event Date\r'),
(85, '40-33/A', 'Amendment to Form 40-33', 'Event Date\r'),
(86, '40-6B', 'Application under the Investment Company Act by an employees', 'Event Date\r'),
(87, '40-6B/A', 'Amendment to Form 40-6B', 'Event Date\r'),
(88, '40-8B25', 'Document or report', 'Event Date\r'),
(89, '40-8F-2', 'Initial application for deregistration pursuant to Investment Company Act Rule 0-2', 'Event Date\r'),
(90, '40-8F-2/A', 'Amendment to Form 40-8F-2', 'Event Date\r'),
(91, '40-APP', 'Applications under the Investment Company Act other than those reviewed by Office of Insurance Produ', 'Event Date\r'),
(92, '40-APP/2', 'Amendment to Form 40-APP', 'Event Date\r'),
(93, '40-F', 'Annual reports filed by certain Canadian issuers pursuant to Section 15(d) and Rule 15d-4', 'Event Date\r'),
(94, '40-F/A', 'Amendment to Form 40-F', 'Event Date\r'),
(95, '40FR12B', 'Registration of a class of securities of certain Canadian issuers pursuant to Section 12(b) of the 1', 'Event Date\r'),
(96, '40FR12B/A', 'Amendment to Form 40FR12B', 'Event Date\r'),
(97, '40FR12G', 'Registration of a class of securities of certain Canadian issuers pursuant to Section 12(g) of the 1', 'Event Date\r'),
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
(109, '485APOS', 'Post-effective amendment filed pursuant to Securities Act Rule 485(a) (this filing cannot be submitt', 'Event Date\r'),
(110, '485BPOS', 'Post-effective amendment filed pursuant to Securities Act Rule 485(b) (this filing cannot be submitt', 'Event Date\r'),
(111, '485BXT', 'Post-effective amendment filed pursuant to Securities Act Rule 485(b)(1)(iii) to designate a new eff', 'Event Date\r'),
(112, '486APOS', 'Post-effective amendment to filing filed pursuant to Securities Act Rule 486(a)', 'Event Date\r'),
(113, '486BPOS', 'Post-effective amendment to filing filed pursuant to Securities Act Rule 486(b)', 'Event Date\r'),
(114, '497AD', 'Filing by certain investment companies of Securities Act Rule 482 advertising in accordance with Sec', 'Event Date\r'),
(115, '497H2', 'Filings made pursuant to Rule 497(h)(2)', 'Event Date\r'),
(116, '497J', 'Certification of no change in definitive materials under paragraph (j) of Securities Act Rule 497', 'Event Date\r'),
(117, '497K', 'Summary Prospectus for certain open-end management investment companies filed pursuant to Securities', 'Event Date\r'),
(118, '5/A', 'Amendment to Form 5', 'Event Date\r'),
(119, '6-K', 'Current report of foreign issuer pursuant to Rules 13a-16 and 15d-16 Amendments', 'Event Date\r'),
(120, '6-K/A', 'Amendment to Form 6-K', 'Event Date\r'),
(121, '8-A12B', 'Form for the registration / listing of a class of securities on a national securities exchange pursu', 'Event Date\r'),
(122, '8-A12B/A', 'Amendment to Form 8-A12B', 'Event Date\r'),
(123, '8-A12G', 'Form for registration of a class of securities pursuant to Section 12(g)', 'Event Date\r'),
(124, '8-A12G/A', 'Amendment to Form 8-A12G', 'Event Date\r'),
(125, '8-K', 'Current report filing', 'Event Date\r'),
(126, '8-K/A', 'Amendment to Form 8-K', 'Event Date\r'),
(127, '8-K12B', 'Notification that a class of securities of successor issuer is deemed to be registered pursuant to S', 'Event Date\r'),
(128, '8-K12B/A', 'Amendment to Form 8-K12B', 'Event Date\r'),
(129, '8-K12G3', 'Notification that a class of securities of successor issuer is deemed to be registered pursuant to S', 'Event Date\r'),
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
(143, 'CB', 'Notification form filed in connection with certain tender offers, business combinations and rights o', 'Event Date\r'),
(144, 'CB/A', 'Amendment to Form CB', 'Event Date\r'),
(145, 'CORRESP', 'A correspondence can be sent as a document with another submission type or can be sent as a separate', 'Event Date\r'),
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
(157, 'DEL AM', 'Separately filed delaying amendment under Securities Act Rule 473 to delay effectiveness of a 1933 A', 'Event Date\r'),
(158, 'DFAN14A', 'Definitive additional proxy soliciting materials filed by non-management including Rule 14(a)(12) ma', 'Event Date\r'),
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
(169, 'F-10EF', 'Auto effective registration statement for securities of certain Canadian issuers under the Securitie', 'Event Date\r'),
(170, 'F-10POS', 'Post-effective amendment to a F-10EF registration', 'Event Date\r'),
(171, 'F-1MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective ', 'Event Date\r'),
(172, 'F-3', 'Registration statement for specified transactions by certain foreign private issuers', 'Event Date\r'),
(173, 'F-3/A', 'Amendment to Form F-3', 'Event Date\r'),
(174, 'F-3ASR', 'Automatic shelf registration statement of securities of well-known seasoned issuers', 'Event Date\r'),
(175, 'F-3D', 'Registration statement for dividend or interest reinvestment plan securities of foreign private issu', 'Event Date\r'),
(176, 'F-3DPOS', 'Post-Effective amendment to a F-3D registration', 'Event Date\r'),
(177, 'F-3MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective ', 'Event Date\r'),
(178, 'F-4', 'Registration statement for securities issued by foreign private issuers in certain business combinat', 'Event Date\r'),
(179, 'F-4 POS', 'Post-effective amendment to a F-4EF registration', 'Event Date\r'),
(180, 'F-4/A', 'Amendment to Form F-4', 'Event Date\r'),
(181, 'F-4EF', 'Auto effective registration statement for securities by certain foreign private issuers in connectio', 'Event Date\r'),
(182, 'F-4MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective ', 'Event Date\r'),
(183, 'F-6', 'Registration statement for American Depositary Receipts representing securities of certain foreign p', 'Event Date\r'),
(184, 'F-6 EF', 'Auto effective registration statement for American Depositary Receipts representing securities of ce', 'Event Date\r'),
(185, 'F-6 POS', 'Post-effective amendment to a F-6EF registration', 'Event Date\r'),
(186, 'F-6/A', 'Amendment to Form F-6', 'Event Date\r'),
(187, 'F-7', 'Registration statement for securities of certain Canadian issuers offered for cash upon the exercise', 'Event Date\r'),
(188, 'F-7 POS', 'Post-effective amendment to a F-7 registration', 'Event Date\r'),
(189, 'F-7/A', 'Amendment to Form F-7', 'Event Date\r'),
(190, 'F-8', 'Registration statement for securities of certain Canadian issuers to be issued in exchange offers or', 'Event Date\r'),
(191, 'F-8 POS', 'Post-effective amendment to a F-8 registration', 'Event Date\r'),
(192, 'F-8/A', 'Amendment to Form F-8', 'Event Date\r'),
(193, 'F-80', 'Registration of securities of certain Canadian issuers to be issued in exchange offers or a business', 'Event Date\r'),
(194, 'F-80/A', 'Amendment to Form F-80', 'Event Date\r'),
(195, 'F-80POS', 'Post-effective amendment to a F-80 registration', 'Event Date\r'),
(196, 'F-9', 'Registration of securities of certain investment grade debt or investment grade preferred securities', 'Event Date\r'),
(197, 'F-9 EF', 'Auto effective registration of securities of certain investment grade debt or investment grade prefe', 'Event Date\r'),
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
(209, 'N-14', 'Initial registration statement filed on Form N14 for open-end investment company, including those fi', 'Event Date\r'),
(210, 'N-14 8C', 'Initial registration statement filed on Form N14 by closed-end investment company (business combinat', 'Event Date\r'),
(211, 'N-14 8C/A', 'Amendment to Form N-14 8C', 'Event Date\r'),
(212, 'N-14/A', 'Amendment to Form N-14', 'Event Date\r'),
(213, 'N-14MEF', 'A new registration statement filed on Form N14 by closed end investment companies filed under Securi', 'Event Date\r'),
(214, 'N-18F1', 'Initial notification of election pursuant to Rule 18f-1 filed on Form N-18F-1', 'Event Date\r'),
(215, 'N-18F1/A', 'Amendment to Form N-18F1', 'Event Date\r'),
(216, 'N-1A', 'Initial registration statement filed on Form N1A for open-end management investment companies', 'Event Date\r'),
(217, 'N-1A/A', 'Amendment to Form N-1A', 'Event Date\r'),
(218, 'N-2', 'Initial filing of a registration statement on Form N-2 for closed-end investment companies', 'Event Date\r'),
(219, 'N-2/A', 'Amendment to Form N-2', 'Event Date\r'),
(220, 'N-23C-2', 'Notice by closed-end investment companies of intention to call or redeem their own securities under ', 'Event Date\r'),
(221, 'N-23C-2/A', 'Amendment to Form N-23C-2', 'Event Date\r'),
(222, 'N-23C3A', 'Notification of periodic repurchase offer Filed pursuant to Rule 23c-3(b) only', 'Event Date\r'),
(223, 'N-23C3A/A', 'Amendment to Form N-23C3A', 'Event Date\r'),
(224, 'N-23C3B', 'Filing pursuant to Rule 23c-3(c) only on Form N-23C-3', 'Event Date\r'),
(225, 'N-23C3B/A', 'Amendment to Form N-23C3B', 'Event Date\r'),
(226, 'N-23C3C', 'Filing pursuant to Rule 23c-3(b) and (c) on Form N-23C-3', 'Event Date\r'),
(227, 'N-23C3C/A', 'Amendment to Form N-23C3C', 'Event Date\r'),
(228, 'N-27D-1', 'Accounting for segregated trust accounts on Form N-27D-1', 'Event Date\r'),
(229, 'N-27D-1/A', 'Amendment to Form N-27D-1', 'Event Date\r'),
(230, 'N-2MEF', 'A new registration statement on Form N-2 filed under Securities Act Rule 462(b) by closed-end invest', 'Event Date\r'),
(231, 'N-3', 'Initial registration statement on Form N-3 for separate accounts (management investment companies)', 'Event Date\r'),
(232, 'N-3/A', 'Amendment to Form N-3', 'Event Date\r'),
(233, 'N-30B-2', 'Periodic and interim reports mailed to investment company shareholders (other than annual and semi-a', 'Event Date\r'),
(234, 'N-30D', 'Initial annual and semi-annual reports mailed to investment company shareholders pursuant to Rule 30', 'Event Date\r'),
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
(246, 'N-6F', 'Notice of intent by business development companies to elect to be subject to Sections 55 through 65 ', 'Event Date\r'),
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
(258, 'N-CSR', 'Certified annual shareholder report of registered management investment companies filed on Form N-CS', 'Period End\r'),
(259, 'N-CSR/A', 'Amendment to Form N-CSR', 'Period End\r'),
(260, 'N-CSRS', 'Certified semi-annual shareholder report of registered management investment companies filed on Form', 'Period End\r'),
(261, 'N-CSRS/A', 'Amendment to Form N-CSRS', 'Period End\r'),
(262, 'N-PX', 'Annual Report of Proxy Voting Record of Registered Management Investment Companies filed on Form N-P', 'Event Date\r'),
(263, 'N-PX/A', 'Amendment to Form N-PX', 'Event Date\r'),
(264, 'N-PX-CR', 'Annual Form N-PX Combination Report filed by institutional managers', 'Period End\r'),
(265, 'N-PX-CR/A', 'Amendment to Form N-PX-CR', 'Period End\r'),
(266, 'N-PX-FM', 'Annual Report of Proxy Voting Record of Registered Management Investment Companies that includes pro', 'Period End\r'),
(267, 'N-PX-FM/A', 'Amendment to Form N-PX-FM', 'Period End\r'),
(268, 'N-PX-NT', 'Annual Form N-PX Notice filed by institutional managers', 'Period End\r'),
(269, 'N-PX-NT/A', 'Amendment to Form N-PX-NT', 'Period End\r'),
(270, 'N-PX-VR', 'Annual Form N-PX Voting Report filed by institutional managers', 'Period End\r'),
(271, 'N-PX-VR/A', 'Amendment to Form N-PX-VR', 'Period End\r'),
(272, 'N-Q', 'Quarterly Schedule of Portfolio Holdings of Registered Management Investment Company filed on Form N', 'Period End\r'),
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
(296, 'NT-NCSR', 'Notice under Exchange Act Rule 12b-25 of inability to timely file Form N-CSR (annual or semi-annual ', 'Period End\r'),
(297, 'NT-NCSR/A', 'Amendment to Form NT-NCSR', 'Period End\r'),
(298, 'NT-NSAR', 'Notice under Exchange Act Rule 12b-25 of inability to timely file Form N-SAR', 'Period End\r'),
(299, 'NT-NSAR/A', 'Amendment to Form NT-NSAR', 'Period End\r'),
(300, 'POS 462B', 'Post-effective amendment to Securities Act Rule 462(b) registration statement', 'Event Date\r'),
(301, 'POS 462C', 'Post-effective amendment to a registration statement filed under Rule 462(c)', 'Event Date\r'),
(302, 'POS 8C', 'Post-effective amendment filed under the 1933 Act only or under both the 1933 and 1940 Acts pursuant', 'Event Date\r'),
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
(318, 'PX14A6N', 'Notice of exempt solicitation for the purpose of determining whether to solicit proxies, consents, o', 'Event Date\r'),
(319, 'QRTLYRPT', 'Periodic Development Bank filing, submitted quarterly', 'Event Date\r'),
(320, 'QRTLYRPT/A', 'Amendment to Form QRTLYRPT', 'Event Date\r'),
(321, 'RW', 'Registration Withdrawal Request', 'Event Date\r'),
(322, 'RW WD', 'Withdrawal of a Registration Withdrawal Request', 'Event Date\r'),
(323, 'S-1', 'General form of registration statement for all companies including face-amount certificate companies', 'Event Date\r'),
(324, 'S-1/A', 'Amendment to Form S-1', 'Event Date\r'),
(325, 'S-11', 'Registration statement for securities to be issued by real estate companies', 'Event Date\r'),
(326, 'S-11/A', 'Amendment to Form S-11', 'Event Date\r'),
(327, 'S-11MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective ', 'Event Date\r'),
(328, 'S-1MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective ', 'Event Date\r'),
(329, 'S-20', 'Registration statement for standardized options', 'Event Date\r'),
(330, 'S-20/A', 'Amendment to Form S-20', 'Event Date\r'),
(331, 'S-3', 'Registration statement for specified transactions by certain issuers', 'Event Date\r'),
(332, 'S-3 MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective ', 'Event Date\r'),
(333, 'S-3/A', 'Amendment to Form S-3', 'Event Date\r'),
(334, 'S-3ASR', 'Automatic shelf registration statement of securities of well-known seasoned issuers', 'Event Date\r'),
(335, 'S-3D', 'Automatically effective registration statement for securities issued pursuant to dividend or interes', 'Event Date\r'),
(336, 'S-3DPOS', 'Post-effective amendment to a S-3D registration statement', 'Event Date\r'),
(337, 'S-4', 'Registration of securities issued in business combination transactions', 'Event Date\r'),
(338, 'S-4 POS', 'Post-effective amendment to a S-4EF registration statement', 'Event Date\r'),
(339, 'S-4/A', 'Amendment to Form S-4', 'Event Date\r'),
(340, 'S-4EF', 'Auto effective registration statement for securities issued in connection with the formation of a ba', 'Event Date\r'),
(341, 'S-4MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective ', 'Event Date\r'),
(342, 'S-6', 'Initial registration statement filed on Form S-6 for unit investment trusts', 'Event Date\r'),
(343, 'S-6/A', 'Amendment to Form S-6', 'Event Date\r'),
(344, 'S-8', 'Initial registration statement for securities to be offered to employees pursuant to employee benefi', 'Event Date\r'),
(345, 'S-8 POS', 'Post-effective amendment to a S-8 registration statement', 'Event Date\r'),
(346, 'S-B', 'Registration statement for securities of foreign governments and subdivisions thereof under the Secu', 'Event Date\r'),
(347, 'S-B MEF', 'A new registration statement filed under Rule 462(b) to add securities to a prior related effective ', 'Event Date\r'),
(348, 'S-B/A', 'Amendment to Form S-B', 'Event Date\r'),
(349, 'SC 13E1', 'Schedule 13-E1 statement of issuer required by Rule 13e-1', 'Event Date\r'),
(350, 'SC 13E1/A', 'Amendment to Form SC 13E1', 'Event Date\r'),
(351, 'SC 13E3', 'Schedule filed to report going private transactions', 'Event Date\r'),
(352, 'SC 13E3/A', 'Amendment to Form SC 13E3', 'Event Date\r'),
(353, 'SC 13G', 'Schedule filed to report acquisition of beneficial ownership of 5% or more of a class of equity secu', 'Event Date\r'),
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
(368, 'SC-13D', 'Schedule filed to report acquisition of beneficial ownership of 5% or more of a class of equity secu', 'Event Date\r'),
(369, 'SC-13D/A', 'Amendment to Form SC 13D', 'Event Date\r'),
(370, 'SC13E4F', 'Issuer tender offer statement filed pursuant to Rule 13(e)(4) by foreign issuers', 'Event Date\r'),
(371, 'SC13E4F/A', 'Amendment to Form SC13E4F', 'Event Date\r'),
(372, 'SC14D1F', 'Third party tender offer statement filed pursuant to Rule 14d-1(b) by foreign issuers', 'Event Date\r'),
(373, 'SC14D1F/A', 'Amendment to Form SC14D1F', 'Event Date\r'),
(374, 'SC14D9C', 'Written communication by the subject company relating to a third party tender offer', 'Event Date\r'),
(375, 'SC14D9F', 'Solicitation/recommendation statement pursuant to Section 14(d)(4) of the Securities Exchange Act of', 'Event Date\r'),
(376, 'SC14D9F/A', 'Amendment to Form SC14D9F', 'Event Date\r'),
(377, 'SD', 'Specialized Disclosure Report filed pursuant to Sections 1502 and 1504 of the Dodd-Frank Wall Street', 'Event Date\r'),
(378, 'SD/A', 'Amendment to Form SD', 'Event Date\r'),
(379, 'SEGMENT', 'A unit of information to be included in more than one filing and that is stored temporarily on EDGAR', 'Event Date\r'),
(380, 'SH-ER', 'Weekly Form SH Entries Report Filed by Institutional Investment Managers', 'Event Date\r'),
(381, 'SH-ER/A', 'Amendment to Form SH-ER', 'Event Date\r'),
(382, 'SH-NT', 'Weekly Form SH Notice Report Filed by Institutional Investment Managers', 'Event Date\r'),
(383, 'SH-NT/A', 'Amendment to Form SH-NT', 'Event Date\r'),
(384, 'SP 15D2', 'Special Financial Report filed under Rule 15d-2', 'Event Date\r'),
(385, 'SP 15D2/A', 'Amendment to Form SP 15D2', 'Event Date\r'),
(386, 'SUPPL', 'Voluntary supplemental material filed pursuant to Section 11(a) of the Securities Act of 1933 by for', 'Event Date\r'),
(387, 'T3', 'Initial application for qualification of trust indentures', 'Event Date\r'),
(388, 'T-3/A', 'Amendment to Form T-3', 'Event Date\r'),
(389, 'T-6', 'Application for determination of eligibility of a foreign person to act as institutional trustee fil', 'Event Date\r'),
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
  `title` varchar(100) DEFAULT NULL,
  `company` int(10) NOT NULL,
  `year` int(11) NOT NULL,
  `formType` varchar(10) NOT NULL,
  `jobNo` varchar(100) NOT NULL,
  `deadlineDate` varchar(100) NOT NULL,
  `createdOn` date NOT NULL,
  `createdBy` int(11) NOT NULL,
  `modifiedOn` date DEFAULT NULL,
  `modifiedBy` int(20) DEFAULT NULL,
  `lifeCycleState` int(3) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `version` decimal(10,0) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `Project`
--

INSERT INTO `Project` (`id`, `title`, `company`, `year`, `formType`, `jobNo`, `deadlineDate`, `createdOn`, `createdBy`, `modifiedOn`, `modifiedBy`, `lifeCycleState`, `action`, `version`, `description`) VALUES
(1, 'GoldmanSachs/2013/Form420/JobNo96Nov2013/ext.xml', 100, 2013, 'Form420', 'JobNo96Nov2013', '0000-00-00', '2013-11-19', 0, '2013-11-19', 4, 1, 'Created', 1, NULL),
(2, 'Walmart.Inc/2011/Form369/JobNo26Jan2011/hmm.xml', 101, 2011, 'Form369', 'JobNo26Jan2011', '0000-00-00', '2013-11-21', 0, '2013-11-21', 6, 2, 'Created', 1, NULL),
(3, 'Walmart.Inc/2010/Form38/JobNo88Jan2010/lmn.xml', 101, 2010, 'Form38', 'JobNo88Jan2010', '0000-00-00', '2013-11-21', 0, '2013-11-21', 2, 1, 'Created', 1, NULL),
(4, 'GoldmanSachs/2013/Form4/JobNo9Mar2013/ext.xml', 100, 2013, 'Form4', 'JobNo9Mar2013', '0000-00-00', '2013-11-21', 0, '2013-11-21', 5, 1, 'Created', 1, NULL),
(5, 'GoldmanSachs/2010/Form56/JobNo9Mar2010/ext.xml', 100, 2010, 'Form56', 'JobNo9Mar2010', '0000-00-00', '0000-00-00', 0, '2013-11-26', 7, 2, 'Created', 1, NULL),
(6, 'Walmart.Inc/1999/Form3/JobNo88Jan1999/lmn.xml', 101, 1999, 'Form3', 'JobNo88Jan1999', '0000-00-00', '0000-00-00', 0, '2013-11-26', 4, 1, 'Created', 1, NULL),
(10, NULL, 100, 2011, '10-12B', '10-12B_Event Date_12/09/2013', '0000-00-00', '2013-12-09', 4, '2013-12-09', 4, 1, 'Created', 1, 'Check'),
(11, NULL, 101, 2005, '144', '144_Event Date_12/27/2013', '0000-00-00', '2013-12-09', 10, '2013-12-09', 10, 1, 'Created', 1, NULL),
(12, NULL, 102, 2010, '5', '5_Period End_12/11/2013', '0000-00-00', '2013-12-10', 4, '2013-12-10', 4, 1, 'Created', 1, ''),
(13, NULL, 102, 2010, 'F-4 POS', 'F-4 POS_Event Date_12/26/2013', '0000-00-00', '2013-12-10', 4, '2013-12-10', 4, 1, 'Created', 1, ''),
(14, NULL, 101, 2009, '25', '25_Event Date_12/11/2013', '0000-00-00', '2013-12-10', 4, '2013-12-10', 4, 1, 'Created', 1, ''),
(15, NULL, 100, 2012, '10-12B', '10-12B_Event Date_12/11/2013', '0000-00-00', '2013-12-10', 4, '2013-12-10', 4, 1, 'Created', 1, ''),
(16, NULL, 100, 2009, '425', 'Form 425_12/13/2013', 'Fri Dec 13 2013 00:00:00 GMT-0500 (EST)', '2013-12-12', 4, '2013-12-12', 4, 1, 'Created', 1, ''),
(17, NULL, 101, 2012, '10-12B/A', 'Form 10-12B/A_12/13/2013', 'Fri Dec 13 2013 00:00:00 GMT-0500 (EST)', '2013-12-12', 4, '2013-12-12', 4, 1, 'Created', 1, ''),
(18, NULL, 102, 2012, '425', 'Form 425_12/13/2013', 'Thu Dec 26 2013 00:00:00 GMT-0500 (EST)', '2013-12-12', 4, '2013-12-12', 4, 1, 'Created', 1, ''),
(19, NULL, 102, 2012, '5', 'Form 5_12/25/2013', 'Fri Dec 20 2013 00:00:00 GMT-0500 (EST)', '2013-12-12', 4, '2013-12-12', 4, 1, 'Created', 1, '');

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
(19, 5),
(19, 6);

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
	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Super User", "Created", NOW(), New.createdBy);
ELSE INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Company User", "Created", NOW(), New.createdBy);
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

INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Super User", "Deleted", NOW(), New.modifiedBy);

END IF;



IF New.domain = 4 AND New.isDeleted = 1 THEN

INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Company User", "Deleted", NOW(), New.modifiedBy);

END IF ;

IF New.domain = 2 AND New.isDeleted = 0 THEN

	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("User", "Modified", NOW(), New.modifiedBy);

END IF;



IF New.domain = 3 AND New.isDeleted = 0 THEN

	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Super User", "Modified", NOW(), New.modifiedBy);

END IF;





IF New.domain = 4 AND New.isDeleted = 0 THEN

	INSERT INTO Edgar.Log (entity,action,actionDateTime,actionBy) VALUES ("Company User", "Modified", NOW(), New.modifiedBy);

END IF;

        

END
//
DELIMITER ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ProjectUser`
--
ALTER TABLE `ProjectUser`
  ADD CONSTRAINT `fk_user_projuser` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_proj_projuser` FOREIGN KEY (`projectId`) REFERENCES `Project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
